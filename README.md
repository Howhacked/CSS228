# CSS228

**Queue Visualization (Double Linked List Style)**

This project visualizes a queue data structure using HTML5 Canvas and JavaScript. It simulates queue operations (enqueue, dequeue, clear) in
a visually engaging way, where each node is displayed as a box with arrows linking it to the next and previous elements—mimicking a doubly
linked list structure. The goal is to help learners understand how queues work dynamically.


**Technologies Used:**

HTML5
CSS3
JavaScript
HTML Canvas API


**Features:**

👨‍💻 Enqueue a value
🗑️ Dequeue the front value
🔄 Clear the entire queue
🎨 Smooth animations for node movements
➡️ Bidirectional arrows showing next and previous links
🧠 Visualization of Head and Tail pointers


**Code Structure**

**File	            Purpose**
index.html	      Contains the structure of the web page
<script>	        Inline JavaScript to handle logic and visualization
<canvas>	        HTML5 canvas for drawing queue elements
VisualNode	      Class that manages position and movement of queue nodes


**How It Works**
  
Each node is a VisualNode object with properties: value, x, y, targetX, targetY.
On enqueue(): a new node is added to the queue and animated to its new position.
On dequeue(): the front node is removed and the remaining nodes shift left visually.
drawQueue() handles the animation loop and drawing arrows between nodes.
Arrows are drawn in both directions to simulate a doubly linked list structure.


**Conclusion**
This project shows an interactive way to understand queue operations and the concept of linked lists. 

