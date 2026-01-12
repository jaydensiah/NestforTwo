# UI Components

Reusable UI components built with React, Tailwind CSS, and React Icons.

## Components

### Modal
A modal dialog component with overlay, close button, and scrollable content.

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback when modal is closed
- `title` (string): Modal title text
- `children` (ReactNode): Modal content

**Example:**
```jsx
import { Modal } from './components/ui';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
}
```

**Features:**
- Prevents body scroll when open
- Click outside to close
- ESC key support (can be added)
- Max height 90vh with scrollable content
- Black 50% opacity overlay (z-50)

---

### Tooltip
An information tooltip that appears on hover or click.

**Props:**
- `content` (string|ReactNode): Tooltip content
- `position` (string): Position relative to trigger - 'top', 'bottom', 'left', 'right' (default: 'top')

**Example:**
```jsx
import { Tooltip } from './components/ui';

function App() {
  return (
    <div>
      Product Name <Tooltip content="This is helpful information" />
    </div>
  );
}
```

**Features:**
- Info icon button (circle with 'i')
- Shows on hover or click
- Positioned above trigger by default
- Arrow pointing to trigger
- Dark background with white text

---

### Accordion
A collapsible accordion component with multiple items.

**Props:**
- `items` (array): Array of objects with `title` and `content` properties

**Example:**
```jsx
import { Accordion } from './components/ui';

function App() {
  const items = [
    {
      title: 'Section 1',
      content: 'Content for section 1'
    },
    {
      title: 'Section 2',
      content: 'Content for section 2'
    }
  ];

  return <Accordion items={items} />;
}
```

**Features:**
- Only one item open at a time
- Smooth transitions
- Rotating arrow icon
- Border between items
- Hover states

---

### Button
A reusable button component with multiple variants and states.

**Props:**
- `children` (ReactNode): Button content
- `variant` (string): 'primary', 'secondary', 'outline', 'ghost' (default: 'primary')
- `size` (string): 'sm', 'md', 'lg' (default: 'md')
- `loading` (boolean): Shows loading spinner
- `disabled` (boolean): Disables the button
- `onClick` (function): Click handler
- `type` (string): Button type attribute (default: 'button')
- `className` (string): Additional CSS classes

**Example:**
```jsx
import { Button } from './components/ui';

function App() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await someAsyncOperation();
    setLoading(false);
  };

  return (
    <div className="space-x-2">
      <Button variant="primary" onClick={handleClick} loading={loading}>
        Primary Button
      </Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button disabled>Disabled Button</Button>
    </div>
  );
}
```

**Features:**
- Primary variant uses wellness-rose background
- Secondary variant has white background with border
- Outline variant is transparent with border
- Ghost variant is transparent
- Hover and active states
- Loading state with spinner
- Disabled state
- Focus ring for accessibility

---

### Dropdown
A dropdown menu component with customizable trigger and items.

**Props:**
- `trigger` (string|ReactNode): The button content/label
- `items` (array): Array of menu items with `label`, `onClick`, `icon`, and `disabled` properties
- `position` (string): 'bottom-left', 'bottom-right', 'top-left', 'top-right' (default: 'bottom-left')
- `className` (string): Additional CSS classes

**Example:**
```jsx
import { Dropdown } from './components/ui';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';

function App() {
  const menuItems = [
    {
      label: 'Settings',
      icon: <IoSettingsOutline />,
      onClick: () => console.log('Settings clicked')
    },
    {
      label: 'Logout',
      icon: <IoLogOutOutline />,
      onClick: () => console.log('Logout clicked')
    },
    {
      label: 'Disabled Item',
      disabled: true,
      onClick: () => console.log('This will not fire')
    }
  ];

  return <Dropdown trigger="Menu" items={menuItems} />;
}
```

**Features:**
- Click outside to close
- Rotating chevron icon
- Hover states for items
- Support for icons
- Disabled items
- Auto-closes on item click
- Customizable position

---

## Installation

These components require the following dependencies:
```bash
npm install react-icons
```

Tailwind CSS should already be configured in your project.

## Import

Import individual components:
```jsx
import Modal from './components/ui/Modal';
import Tooltip from './components/ui/Tooltip';
import Accordion from './components/ui/Accordion';
import Button from './components/ui/Button';
import Dropdown from './components/ui/Dropdown';
```

Or import from index:
```jsx
import { Modal, Tooltip, Accordion, Button, Dropdown } from './components/ui';
```

## Styling

All components use Tailwind CSS classes with the custom color palette:
- `wellness-rose` - Primary color for buttons and accents
- `wellness-blush` - Light background and hover states
- `wellness-cream` - Main background color
- `wellness-text` - Body text color
- `wellness-dark` - Headings and navigation

Components also use custom fonts:
- `font-playfair-bold` - Headings
- `font-nunito-regular` - Body text
- `font-nunito-light` - Light text
