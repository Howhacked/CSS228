const dllMethods = document.querySelector('#dll-methods')
const dllMethodsOptions = document.querySelectorAll('#dll-methods option')
const selectedMethod = document.querySelector('.selected-method')
const runFunction = document.querySelector('#run-function')
const inputFunctions = document.querySelector('.input-functions div')
console.log(inputFunctions)
const outputs = document.querySelector('.outputs div')
console.log(outputs)
let dllArray = []

// Initialize animation speed variable
let animationSpeed = 1;
const speedSlider = document.getElementById('animation-speed');
const speedValue = document.getElementById('speed-value');

// Set initial CSS variable for animation speed
document.documentElement.style.setProperty('--animation-speed', '0.4s');

// Function to show notifications instead of alert
function showNotification(message, type = 'info', title = null) {
  const notificationContainer = document.getElementById('notification-container');
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Icon based on notification type
  let icon = '';
  switch(type) {
    case 'error':
      icon = '⚠️';
      title = title || 'Error';
      break;
    case 'success':
      icon = '✅';
      title = title || 'Success';
      break;
    default:
      icon = 'ℹ️';
      title = title || 'Information';
  }
  
  notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close">✕</button>
    <div class="notification-progress">
      <div class="notification-progress-bar"></div>
    </div>
  `;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Add handler for close button
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.style.animation = 'slideOutNotification 0.5s forwards';
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 500);
  });
  
  // Automatically remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode === notificationContainer) {
      notification.style.animation = 'slideOutNotification 0.5s forwards';
      setTimeout(() => {
        if (notification.parentNode === notificationContainer) {
          notificationContainer.removeChild(notification);
        }
      }, 500);
    }
  }, 5000);
}

// Speed slider change handler
if (speedSlider) {
  speedSlider.addEventListener('input', function() {
    animationSpeed = this.value;
    speedValue.textContent = animationSpeed + 'x';
    
    // Update CSS variable
    const newDuration = (0.4 / animationSpeed) + 's';
    document.documentElement.style.setProperty('--animation-speed', newDuration);
  });
}

selectedMethod.innerHTML = `<p>${dllMethods.value}(
  <input type="number" placeholder="data">
)</p>`;

dllMethods.addEventListener('change', () => {
  const value = dllMethods.value;
  console.log(value)
  // Dynamically update the input UI
  switch (value) {
    case 'addFirst':
    case 'addLast':
    case 'remove':
    case 'find':
    case 'contains':
      selectedMethod.innerHTML = `
        <p>${value}(
          <input type="number" placeholder="data">
        )</p>`;
      break;

    case 'insertAt':
      selectedMethod.innerHTML = `
        <p>insertAt(
          <input type="number" placeholder="index">,
          <input type="number" placeholder="data">
        )</p>`;
      break;

    case 'removeAt':
    case 'get':
      selectedMethod.innerHTML = `
        <p>${value}(
          <input type="number" placeholder="index">
        )</p>`;
      break;

    case 'removeFirst':
    case 'removeLast':
    case 'isEmpty':
    case 'size':
      selectedMethod.innerHTML = `<p>${value}()</p>`;
      break;

    default:
      selectedMethod.innerHTML = '';
  }
});

runFunction.addEventListener('click', () => {
  const method = dllMethods.value;
  const inputs = selectedMethod.querySelectorAll('input');

  const dllFunction = document.createElement('div');
  dllFunction.classList.add('dll-function');

  const output = document.createElement('p');

  const getNumber = (input) => {
    return input.value.trim() !== '' ? Number(input.value) : null;
  };

  try {
    switch (method) {
      case 'addFirst': {
        const value = getNumber(inputs[0]);
        if (value === null) {
          showNotification('Please enter a value for addFirst()', 'error');
          return;
        }
        
        addFirst(value);
        dllFunction.innerHTML = `addFirst(${value})`;
        
        // Update array to synchronize with display
        dllArray.unshift(value);
        output.innerHTML = `${dllArray}`;
        break;
      }

      case 'addLast': {
        const value = getNumber(inputs[0]);
        if (value === null) {
          showNotification('Please enter a value for addLast()', 'error');
          return;
        }
        
        addLast(value);
        dllFunction.innerHTML = `addLast(${value})`;
        
        // Update array to synchronize with display
        dllArray.push(value);
        output.innerHTML = `${dllArray}`;
        break;
      }

      case 'insertAt': {
        const index = getNumber(inputs[0]);
        const value = getNumber(inputs[1]);
        if (value === null || index === null) {
          showNotification('Please enter both index and value for insertAt()', 'error');
          return;
        }
        
        if (index < 0 || index > dll.length) {
          showNotification(`Index ${index} out of range [0, ${dll.length}]`, 'error');
          return;
        }
        
        insertAt(index, value);
        dllFunction.innerHTML = `insertAt(${index}, ${value})`;
        
        // Update array to synchronize with display
        dllArray.splice(index, 0, value);
        output.innerHTML = `${dllArray}`;
        break;
      }
      
      case 'removeFirst': {
        if (dll.length === 0) {
          showNotification('List is empty, cannot remove first element', 'error');
          return;
        }
        
        removeFirst();
        dllFunction.innerHTML = `removeFirst()`;
        
        // Update array to synchronize with display
        if (dllArray.length > 0) {
          dllArray.shift();
          output.innerHTML = `${dllArray}`;
        }
        break;
      }

      case 'removeLast': {
        if (dll.length === 0) {
          showNotification('List is empty, cannot remove last element', 'error');
          return;
        }
        
        removeLast();
        dllFunction.innerHTML = `removeLast()`;
        
        // Update array to synchronize with display
        if (dllArray.length > 0) {
          dllArray.pop();
          output.innerHTML = `${dllArray}`;
        }
        break;
      }
      
      case 'removeAt': {
        const index = getNumber(inputs[0]);
        if (index === null) {
          showNotification('Please enter an index for removeAt()', 'error');
          return;
        }
        
        if (index < 0 || index >= dll.length) {
          showNotification(`Index ${index} out of range [0, ${dll.length - 1}]`, 'error');
          return;
        }
        
        removeAt(index);
        dllFunction.innerHTML = `removeAt(${index})`;
        
        // Update array to synchronize with display
        if (dllArray.length > index) {
          dllArray.splice(index, 1);
          output.innerHTML = `${dllArray}`;
        }
        break;
      }

      case 'remove': {
        const value = getNumber(inputs[0]);
        if (value === null) {
          showNotification('Please enter a value for remove()', 'error');
          return;
        }
        
        // Check if value exists in list
        if (!dllArray.includes(value)) {
          showNotification(`Value ${value} not found in the list`, 'error');
          return;
        }
        
        remove(value);
        dllFunction.innerHTML = `remove(${value})`;
        
        // Update array to synchronize with display - remove ALL occurrences
        dllArray = dllArray.filter(val => val !== value);
        output.innerHTML = `${dllArray}`;
        break;
      }

      case 'get': {
        const index = getNumber(inputs[0]);
        if (index === null) {
          showNotification('Please enter an index for get()', 'error');
          return;
        }
        
        if (index < 0 || index >= dll.length) {
          showNotification(`Index ${index} out of range [0, ${dll.length - 1}]`, 'error');
          return;
        }
        
        const getValue = get(index);
        dllFunction.innerHTML = `get(${index})`;
        output.innerHTML = `Value: ${getValue !== null ? getValue : 'null'}`;
        break;
      }

      case 'find': {
        const value = getNumber(inputs[0]);
        if (value === null) {
          showNotification('Please enter a value for find()', 'error');
          return;
        }
        
        const findIndex = find(value);
        dllFunction.innerHTML = `find(${value})`;
        output.innerHTML = `Index: ${findIndex !== -1 ? findIndex : 'Not found'}`;
        break;
      }

      case 'contains': {
        const value = getNumber(inputs[0]);
        if (value === null) {
          showNotification('Please enter a value for contains()', 'error');
          return;
        }
        
        const containsValue = contains(value);
        dllFunction.innerHTML = `contains(${value})`;
        output.innerHTML = `${containsValue}`;
        break;
      }

      case 'isEmpty': {
        // Synchronize array before calling isEmpty
        syncArrayWithList();
        
        const isEmptyResult = isEmpty();
        dllFunction.innerHTML = `isEmpty()`;
        output.innerHTML = isEmptyResult ? "true" : "false";
        break;
      }

      case 'size': {
        // Synchronize array before calling size
        syncArrayWithList();
        
        const sizeValue = size();
        dllFunction.innerHTML = `size()`;
        output.innerHTML = `${sizeValue}`;
        break;
      }
    }

    inputFunctions.appendChild(dllFunction);
    outputs.appendChild(output);
  } catch (error) {
    showNotification(`An error occurred: ${error.message}`, 'error');
  }
});

const dllContainer = document.querySelector('#dll-container');

class DLLNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
    this.id = 'node-' + Math.random().toString(36).substr(2, 9); // Unique ID for the node
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.lastAddedNode = null; // Variable to store the ID of the last added node
    this.lastOperation = null; // Variable to store the last operation
  }

  updateUI() {
    const existingIds = new Set();
    const newChildren = [];
  
    dllContainer.innerHTML = '';
  
    let current = this.head;
    let index = 0;
    let lastAddedNode = this.lastAddedNode; // Remember the last added node
    let lastOperation = this.lastOperation; // Remember the last operation
  
    while (current) {
      existingIds.add(current.id);
  
      const node = document.createElement('div');
      node.className = 'node';
      
      // If this is the last added node, add the corresponding class
      if (current.id === lastAddedNode) {
        node.classList.add('last-added');
        
        // Add animation class depending on the operation
        if (lastOperation === 'addFirst') {
          node.classList.add('add-first');
        } else if (lastOperation === 'addLast') {
          node.classList.add('add-last');
        } else if (lastOperation === 'insertAt') {
          node.classList.add('insert-at');
        }
      }
      
      node.id = current.id;
      node.dataset.index = index;
  
      const label = [];
      if (current === this.head) label.push('Head');
      if (current === this.tail) label.push('Tail');
      const labelText = label.join(' & ');
  
      node.innerHTML = `
        <div class="node-data">${current.data}</div>
        ${labelText ? `<div class="label">${labelText}</div>` : ''}
        <div class="node-index">${index}</div>
      `;
  
      newChildren.push(node);
  
      if (current.next) {
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.innerHTML = '⇄';
        newChildren.push(arrow);
      }
  
      current = current.next;
      index++;
    }
  
    newChildren.forEach(child => dllContainer.appendChild(child));
    
    // Update message if list is empty
    const actionText = document.getElementById('actionText');
    if (this.length === 0) {
      actionText.textContent = 'List is empty';
    } else {
      actionText.textContent = `List contains ${this.length} element${this.length > 1 ? 's' : ''}`;
    }
  }

  addFirst(data) {
    const newNode = new DLLNode(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    this.lastAddedNode = newNode.id; // Save ID of the last added node
    this.lastOperation = 'addFirst'; // Remember the operation
    
    // Animation for container elements
    const container = document.getElementById('dll-container');
    if (container) {
      container.style.paddingLeft = '60px'; // Shift container for animation
      
      setTimeout(() => {
        container.style.paddingLeft = '20px'; // Return back
        this.updateUI(); // Update UI after a small delay
        
        // Show notification about successful operation
        showNotification(`Element ${data} successfully added to the beginning of the list`, 'success');
      }, 300);
    } else {
      this.updateUI();
    }
  }

  addLast(data) {
    const newNode = new DLLNode(data);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    this.lastAddedNode = newNode.id; // Save ID of the last added node
    this.lastOperation = 'addLast'; // Remember the operation
    this.updateUI();
    
    // Animation for new node and automatic scrolling
    setTimeout(() => {
      const tailNode = document.getElementById(this.tail.id);
      if (tailNode) {
        // Scroll container to show new element
        tailNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        
        // Show notification about successful operation
        showNotification(`Element ${data} successfully added to the end of the list`, 'success');
      }
    }, 100);
  }

  insertAt(index, data) {
    if (index < 0 || index > this.length) {
      showNotification(`Invalid index: ${index}. Must be in range [0, ${this.length}]`, 'error');
      return;
    }
    if (index === 0) return this.addFirst(data);
    if (index === this.length) return this.addLast(data);

    const newNode = new DLLNode(data);
    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }

    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;

    this.length++;
    this.lastAddedNode = newNode.id; // Save ID of the last added node
    this.lastOperation = 'insertAt'; // Remember the operation
    this.updateUI();
    
    // Animation for new node
    setTimeout(() => {
      const newNodeElement = document.getElementById(newNode.id);
      if (newNodeElement) {
        // Show notification about successful operation
        showNotification(`Element ${data} successfully inserted at index ${index}`, 'success');
      }
    }, 100);
  }

  removeFirst() {
    if (!this.head) {
      showNotification('Cannot remove element from empty list', 'error');
      return;
    }
    
    const removedNodeId = this.head.id;
    const removedData = this.head.data;
    const headElement = document.getElementById(removedNodeId);
    
    if (headElement) {
      // If removing the last added element, remove the mark
      if (this.lastAddedNode === removedNodeId) {
        this.lastAddedNode = null;
      }
      
      headElement.classList.add('node-remove');
      
      // Animation of container shift after removal
      setTimeout(() => {
        const container = document.getElementById('dll-container');
        if (container) {
          container.style.paddingLeft = '0';
          
          setTimeout(() => {
            container.style.paddingLeft = '20px';
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
            else this.tail = null;
            this.length--;
            this.updateUI();
            
            // Show notification about successful operation
            showNotification(`Element ${removedData} successfully removed from the beginning of the list`, 'success');
          }, 300);
        } else {
          this.head = this.head.next;
          if (this.head) this.head.prev = null;
          else this.tail = null;
          this.length--;
          this.updateUI();
        }
      }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-speed')) * 1000);
    } else {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      this.length--;
      this.updateUI();
    }
  }

  removeLast() {
    if (!this.tail) {
      showNotification('Cannot remove element from empty list', 'error');
      return;
    }
    
    const removedNodeId = this.tail.id;
    const removedData = this.tail.data;
    const tailElement = document.getElementById(removedNodeId);
    
    if (tailElement) {
      // If removing the last added element, remove the mark
      if (this.lastAddedNode === removedNodeId) {
        this.lastAddedNode = null;
      }
      
      tailElement.classList.add('node-remove');
      setTimeout(() => {
        this.tail = this.tail.prev;
        if (this.tail) {
          this.tail.next = null;
          
          // Show notification about successful operation
          showNotification(`Element ${removedData} successfully removed from the end of the list`, 'success');
        }
        else this.head = null;
        this.length--;
        this.updateUI();
      }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-speed')) * 1000);
    } else {
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
      else this.head = null;
      this.length--;
      this.updateUI();
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      showNotification(`Invalid index: ${index}. Must be in range [0, ${this.length - 1}]`, 'error');
      return;
    }
    if (index === 0) return this.removeFirst();
    if (index === this.length - 1) return this.removeLast();

    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    
    // If removing the last added element, remove the mark
    if (this.lastAddedNode === current.id) {
      this.lastAddedNode = null;
    }
    
    const nodeElement = document.getElementById(current.id);
    const removedData = current.data;
    
    if (nodeElement) {
      nodeElement.classList.add('node-remove');
      setTimeout(() => {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        this.updateUI();
        
        // Show notification about successful operation
        showNotification(`Element ${removedData} successfully removed at index ${index}`, 'success');
      }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-speed')) * 1000);
    } else {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      this.length--;
      this.updateUI();
    }
  }

  remove(data) {
    if (this.length === 0) {
      showNotification("The list is empty, cannot remove elements", 'error');
      return false;
    }
    
    let current = this.head;
    let found = false;
    let removedCount = 0;
    let nodesToRemove = [];
    
    // First, identify all nodes to remove
    while (current) {
      if (current.data === data) {
        found = true;
        nodesToRemove.push(current);
      }
      current = current.next;
    }
    
    if (!found) {
      showNotification(`Element ${data} not found in the list`, 'error');
      return false;
    }
    
    // Track which node we are removing (for animation purposes)
    let currentNodeIndex = 0;
    
    // Function to remove the next node in sequence
    const removeNextNode = () => {
      if (currentNodeIndex >= nodesToRemove.length) {
        // All nodes removed
        showNotification(`Removed ${removedCount} occurrence${removedCount !== 1 ? 's' : ''} of element ${data}`, 'success');
        return;
      }
      
      const nodeToRemove = nodesToRemove[currentNodeIndex];
      currentNodeIndex++;
      
      // If removing the last added node, clear the marker
      if (this.lastAddedNode === nodeToRemove.id) {
        this.lastAddedNode = null;
      }
      
      const nodeElement = document.getElementById(nodeToRemove.id);
      
      // Remove the node from the list
      if (nodeToRemove === this.head) {
        this.head = nodeToRemove.next;
        if (this.head) this.head.prev = null;
        else this.tail = null;
      } else if (nodeToRemove === this.tail) {
        this.tail = nodeToRemove.prev;
        if (this.tail) this.tail.next = null;
        else this.head = null;
      } else {
        nodeToRemove.prev.next = nodeToRemove.next;
        nodeToRemove.next.prev = nodeToRemove.prev;
      }
      
      // Decrease length
      this.length--;
      removedCount++;
      
      // Animate removal if element exists in DOM
      if (nodeElement) {
        nodeElement.classList.add('node-remove');
        
        // After animation completes, update UI and continue to next node
        setTimeout(() => {
          this.updateUI();
          removeNextNode(); // Process next node if any
        }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-speed')) * 1000);
      } else {
        // If no DOM element, just continue to next node
        removeNextNode();
      }
    };
    
    // Start removing nodes
    removeNextNode();
    
    return true;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      showNotification(`Invalid index: ${index}. Must be in range [0, ${this.length - 1}]`, 'error');
      return null;
    }
    
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    
    // Highlight found element
    const nodeElement = document.getElementById(current.id);
    if (nodeElement) {
      nodeElement.classList.add('pulse-animation');
      setTimeout(() => {
        nodeElement.classList.remove('pulse-animation');
      }, 1000);
      
      // Show notification with result
      showNotification(`Data at index ${index}: ${current.data}`, 'info');
    }
    
    return current.data;
  }

  find(data) {
    if (this.length === 0) {
      showNotification("List is empty, search not possible", 'error');
      return -1;
    }
    
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.data === data) {
        // Highlight found element
        const nodeElement = document.getElementById(current.id);
        if (nodeElement) {
          nodeElement.classList.add('pulse-animation');
          setTimeout(() => {
            nodeElement.classList.remove('pulse-animation');
          }, 1000);
        }
        
        // Show notification with result
        showNotification(`Data ${data} found at index ${index}`, 'success');
        return index;
      }
      current = current.next;
      index++;
    }
    
    // Show notification with result
    showNotification(`Data ${data} not found in the list`, 'error');
    return -1;
  }

  contains(data) {
    if (this.length === 0) {
      showNotification("List is empty, search not possible", 'error');
      return false;
    }
    
    let current = this.head;
    while (current) {
      if (current.data === data) {
        // Highlight found element
        const nodeElement = document.getElementById(current.id);
        if (nodeElement) {
          nodeElement.classList.add('pulse-animation');
          setTimeout(() => {
            nodeElement.classList.remove('pulse-animation');
          }, 1000);
        }
        
        // Show notification with result
        showNotification(`List contains element ${data}`, 'success');
        return true;
      }
      current = current.next;
    }
    
    // Show notification with result
    showNotification(`List does not contain element ${data}`, 'error');
    return false;
  }

  isEmpty() {
    const result = this.length === 0;
    
    // Show notification with result
    showNotification(result ? "List is empty" : "List is not empty", result ? 'info' : 'success');
    
    return result;
  }

  size() {
    showNotification(`List size: ${this.length}`, 'info');
    return this.length;
  }
}

const dll = new DoublyLinkedList();

function addFirst(data) { dll.addFirst(data); }
function addLast(data) { dll.addLast(data); }
function insertAt(index, data) { dll.insertAt(index, data); }
function removeFirst() { dll.removeFirst(); }
function removeLast() { dll.removeLast(); }
function removeAt(index) { dll.removeAt(index); }
function remove(data) { dll.remove(data); }
function get(index) { return dll.get(index); }
function find(data) { return dll.find(data); }
function contains(data) { return dll.contains(data); }
function isEmpty() { return dll.isEmpty(); }
function size() { return dll.size(); }

// Function to synchronize array with list
function syncArrayWithList() {
  dllArray = [];
  let current = dll.head;
  while (current) {
    dllArray.push(current.data);
    current = current.next;
  }
}



