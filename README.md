imageCover jquery plugin
========================

This jQuery plugin can be used to mimic the background-size:cover; for img elementsto cover their parent container.

###Example

```javascript
<div class="js-imagecover"><img src="myawesomeimage.jpg" /></div>
$('.js-imagecover').imageCover(); // stretches image to cover container
```

###Full options
```javascript

$('.js-imagecover').imageCover({
	windowMinWidth: false,
	windowMaxWidth: false,
	vAlign: 0.5, // 0 = top, 0.5 = middle, 1 = bottom
	hAlign: 0.5, // 0 = left, 0.5 = center, 1 = right
	interval: 0 // use when container changes size due to its content (usually due to other images)
});

```
