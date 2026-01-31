# Date Picker Mobile Implementation Guide

This document explains how the date picker validation and mobile blocking works in the BirdNest project, to help replicate it in Vite + React.

---

## The Problem

In mobile browsers, native `<input type="date">` pickers behave differently than desktop. The key to making dates unselectable on mobile is **setting the `min` attribute dynamically** before the picker opens.

---

## Key Technique: Dual Input Pattern

The implementation uses **two inputs**:
1. A **visible text input** (readonly) that displays the formatted date
2. A **hidden date input** that handles the native date picker

```html
<!-- Display Input (User sees this) -->
<input type="text"
       id="delivery-date-display"
       class="w-full px-3 py-3 border border-gray-300 cursor-pointer"
       placeholder="DD/MM/YYYY"
       readonly
       onclick="openCustomDatePicker('delivery-date')">

<!-- Hidden Date Input (Native picker) -->
<input type="date"
       id="delivery-date"
       name="delivery-date"
       class="absolute opacity-0 pointer-events-none"
       min=""
       required
       onchange="handleDateSelection(this, 'delivery-date-display')"
       style="left: 0; top: 0; width: 100%; height: 100%; z-index: -1;">
```

---

## Critical JavaScript Functions

### 1. Singapore Timezone Helpers

```javascript
// Get current Singapore time
function getSingaporeTime() {
    const now = new Date();
    const singaporeTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Singapore"}));
    return singaporeTime;
}

// Get Singapore date only (no time component)
function getSingaporeToday() {
    const singaporeTime = getSingaporeTime();
    return new Date(singaporeTime.getFullYear(), singaporeTime.getMonth(), singaporeTime.getDate());
}
```

### 2. Initialize Date Constraints (Run on Page Load)

```javascript
function initializeDeliveryDate() {
    const now = getSingaporeTime();
    const currentHour = now.getHours();
    const today = getSingaporeToday();

    // IMPORTANT: Today's date is ALWAYS blocked
    let minDeliveryDate;

    if (currentHour >= 20) { // 8 PM or later (20:00)
        // After 8 PM: Block today + tomorrow
        minDeliveryDate = new Date(today);
        minDeliveryDate.setDate(today.getDate() + 2);
    } else {
        // Before 8 PM: Block today only
        minDeliveryDate = new Date(today);
        minDeliveryDate.setDate(today.getDate() + 1);
    }

    // Set maximum date to 30 days from today
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    // Format dates for input (YYYY-MM-DD) - AVOID toISOString() to prevent timezone issues
    const minDateStr = minDeliveryDate.getFullYear() + '-' +
                      String(minDeliveryDate.getMonth() + 1).padStart(2, '0') + '-' +
                      String(minDeliveryDate.getDate()).padStart(2, '0');
    const maxDateStr = maxDate.getFullYear() + '-' +
                      String(maxDate.getMonth() + 1).padStart(2, '0') + '-' +
                      String(maxDate.getDate()).padStart(2, '0');

    // Apply constraints to input
    const deliveryDateInput = document.getElementById('delivery-date');
    if (deliveryDateInput) {
        deliveryDateInput.min = minDateStr;
        deliveryDateInput.max = maxDateStr;
    }
}
```

### 3. Open Date Picker (CRITICAL FOR MOBILE)

This is the **key function** that makes mobile work. It **recalculates and sets the `min` attribute right before opening** the picker:

```javascript
function openCustomDatePicker(dateInputId) {
    const hiddenDateInput = document.getElementById(dateInputId);
    if (!hiddenDateInput) return;

    // CRITICAL: Recalculate min date RIGHT BEFORE opening picker
    const now = getSingaporeTime();
    const currentHour = now.getHours();
    const today = getSingaporeToday();

    let minDeliveryDate;
    if (currentHour >= 20) { // After 8 PM
        minDeliveryDate = new Date(today);
        minDeliveryDate.setDate(today.getDate() + 2);
    } else {
        minDeliveryDate = new Date(today);
        minDeliveryDate.setDate(today.getDate() + 1);
    }

    const minDateStr = minDeliveryDate.getFullYear() + '-' +
                      String(minDeliveryDate.getMonth() + 1).padStart(2, '0') + '-' +
                      String(minDeliveryDate.getDate()).padStart(2, '0');

    // SET MIN ATTRIBUTE BEFORE OPENING - This is what makes mobile work!
    hiddenDateInput.min = minDateStr;

    // Temporarily make the input clickable and bring it to front
    hiddenDateInput.style.zIndex = '10';
    hiddenDateInput.style.pointerEvents = 'auto';

    // Focus and open the picker
    hiddenDateInput.focus();
    try {
        if (typeof hiddenDateInput.showPicker === 'function') {
            hiddenDateInput.showPicker();
        }
    } catch (error) {
        console.log('showPicker not supported');
    }

    // Hide the input again after a short delay
    setTimeout(() => {
        hiddenDateInput.style.zIndex = '-1';
        hiddenDateInput.style.pointerEvents = 'none';
    }, 100);
}
```

### 4. Handle Date Selection (Validation Fallback)

```javascript
function handleDateSelection(hiddenInput, displayInputId) {
    const selectedDate = hiddenInput.value;
    const displayInput = document.getElementById(displayInputId);

    if (!displayInput || !selectedDate) return;

    const now = getSingaporeTime();
    const today = getSingaporeToday();
    const selectedDateObj = new Date(selectedDate + 'T00:00:00');
    const currentHour = now.getHours();

    // Check 1: Is it a past date?
    if (selectedDateObj < today) {
        alert('Please select a valid date');
        hiddenInput.value = '';
        displayInput.value = '';
        return;
    }

    // Check 2: Is it today? (Silently reject)
    if (selectedDateObj.getTime() === today.getTime()) {
        hiddenInput.value = '';
        displayInput.value = '';
        return;
    }

    // Check 3: Is it tomorrow after 8PM?
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (selectedDateObj.getTime() === tomorrow.getTime() && currentHour >= 20) {
        alert('Next day delivery is not available after 8pm today, please select another date');
        hiddenInput.value = '';
        displayInput.value = '';
        return;
    }

    // All validations passed - format and display (DD/MM/YYYY)
    const day = String(selectedDateObj.getDate()).padStart(2, '0');
    const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
    const year = selectedDateObj.getFullYear();

    displayInput.value = `${day}/${month}/${year}`;
}
```

---

## Why This Works on Mobile

The **critical insight** is that mobile browsers read the `min` and `max` attributes **when the picker opens**, not when the page loads.

The `openCustomDatePicker()` function:
1. **Recalculates** the minimum date based on current time
2. **Sets the `min` attribute** immediately before opening
3. **Then opens** the native picker via `showPicker()` or `focus()`

This ensures the native mobile date picker sees the correct constraints and grays out invalid dates.

---

## React Implementation Tips

For Vite + React, convert this to:

```jsx
import { useState, useRef } from 'react';

function DeliveryDatePicker() {
  const [displayDate, setDisplayDate] = useState('');
  const hiddenInputRef = useRef(null);

  const getSingaporeTime = () => {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
  };

  const getSingaporeToday = () => {
    const singaporeTime = getSingaporeTime();
    return new Date(singaporeTime.getFullYear(), singaporeTime.getMonth(), singaporeTime.getDate());
  };

  const formatDateForInput = (date) => {
    return date.getFullYear() + '-' +
           String(date.getMonth() + 1).padStart(2, '0') + '-' +
           String(date.getDate()).padStart(2, '0');
  };

  const getMinDate = () => {
    const now = getSingaporeTime();
    const currentHour = now.getHours();
    const today = getSingaporeToday();

    let minDeliveryDate = new Date(today);
    if (currentHour >= 20) {
      minDeliveryDate.setDate(today.getDate() + 2);
    } else {
      minDeliveryDate.setDate(today.getDate() + 1);
    }
    return formatDateForInput(minDeliveryDate);
  };

  const getMaxDate = () => {
    const today = getSingaporeToday();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    return formatDateForInput(maxDate);
  };

  // CRITICAL: Update min attribute and open picker
  const openDatePicker = () => {
    const input = hiddenInputRef.current;
    if (!input) return;

    // Set min RIGHT BEFORE opening - this is the key!
    input.min = getMinDate();
    input.max = getMaxDate();

    // Temporarily make visible
    input.style.zIndex = '10';
    input.style.pointerEvents = 'auto';

    input.focus();
    try {
      input.showPicker?.();
    } catch (e) {
      console.log('showPicker not supported');
    }

    setTimeout(() => {
      input.style.zIndex = '-1';
      input.style.pointerEvents = 'none';
    }, 100);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const now = getSingaporeTime();
    const today = getSingaporeToday();
    const selectedDateObj = new Date(selectedDate + 'T00:00:00');
    const currentHour = now.getHours();

    // Validation checks...
    if (selectedDateObj < today || selectedDateObj.getTime() === today.getTime()) {
      e.target.value = '';
      setDisplayDate('');
      return;
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (selectedDateObj.getTime() === tomorrow.getTime() && currentHour >= 20) {
      alert('Next day delivery is not available after 8pm');
      e.target.value = '';
      setDisplayDate('');
      return;
    }

    // Format for display (DD/MM/YYYY)
    const day = String(selectedDateObj.getDate()).padStart(2, '0');
    const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
    const year = selectedDateObj.getFullYear();
    setDisplayDate(`${day}/${month}/${year}`);
  };

  return (
    <div className="relative">
      {/* Display Input */}
      <input
        type="text"
        value={displayDate}
        placeholder="DD/MM/YYYY"
        readOnly
        onClick={openDatePicker}
        className="w-full px-3 py-3 border cursor-pointer"
      />

      {/* Hidden Date Input */}
      <input
        ref={hiddenInputRef}
        type="date"
        onChange={handleDateChange}
        className="absolute opacity-0 pointer-events-none"
        style={{ left: 0, top: 0, width: '100%', height: '100%', zIndex: -1 }}
      />
    </div>
  );
}
```

---

## Summary

| What | Why It Matters |
|------|---------------|
| **Dual input pattern** | Consistent UI across browsers |
| **Set `min` before opening** | Mobile reads constraints when picker opens |
| **Use `showPicker()`** | Programmatic trigger for modern browsers |
| **Manual date formatting** | Avoid `toISOString()` timezone issues |
| **JavaScript validation** | Fallback for browsers that ignore `min`/`max` |

---

## Source Files

- [KueLapisNest.html:816-960](KueLapisNest.html#L816-L960) - Date validation functions
- [KueLapisNest.html:428-447](KueLapisNest.html#L428-L447) - HTML structure
