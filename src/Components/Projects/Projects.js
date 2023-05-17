import { Component } from 'react';
import './Projects.css';

// List of animation handler objects
var AnimateScrollList = [];
// Index of item in array to animate
var idx = 0;

// Scroll handler
document.addEventListener("wheel", (evt) => {
  const direction = Math.sign(evt.wheelDeltaY);
  AnimateScrollList[idx].scroll(direction);
  if (AnimateScrollList[idx].getGoNext() == true && idx != AnimateScrollList.length-1) {idx++}
  else if (AnimateScrollList[idx].getGoPrev() == true && idx != 0) {idx--}

  console.log(idx);
});

export default class Projects extends Component {
  render() {
    return (
      <div>
        <ul className="Projects">
          <li id="l1">test</li>
          <li id="l2">test</li>
          <li id="l3">test</li>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    if (AnimateScrollList.length == 0) {
      var container = document.getElementsByClassName("Projects")[0];
      var li1 = document.querySelector(".Projects > li");
      var leftAmt = window.innerWidth / 2 - li1.offsetWidth / 2;
      var topAmt = window.innerHeight / 2 - li1.offsetHeight / 2;
      container.style.left = leftAmt + "px";
      container.style.top = topAmt + "px";

      let lists = document.querySelectorAll(".Projects > li");
      lists.forEach(list => {
        list.style.opacity = "0";
        list.style.transform = "translateX(500px) scale(0)";
        AnimateScrollList.push(new AnimateScroll(list));
      });
      console.log(AnimateScrollList);
    }
  }
}


class AnimateScroll {
  getGoNext() {
    return this.goNext;
  }
  getGoPrev() {
    return this.goPrev;
  }

  constructor(element) {
    this.goNext = false;
    this.goPrev = false;

    this.element = element;

    // Track current values
    this.x = 500; // def 0
    this.scale = 0; // def 1
  }

  // Do animation when scroll (up or down)
  scroll(direction) {
    // Scroll step values
    const xStep = 100;
    const scaleStep = 0.2;
    
    var transXValue = direction*xStep + this.x;
    var scaleValue = -direction*scaleStep + this.scale;

    if (scaleValue >= 2) {
      this.element.style.opacity = "0";
      
      this.goNext = true;
      this.goPrev = false;

      return
    } else if (scaleValue < 0.2) {
      this.element.style.opacity = "0";

      this.goNext = false;
      this.goPrev = true;
      return
    } else {
      this.element.style.opacity = "1";
      this.element.style.filter = "blur(0px)";

      this.goNext = false;
      this.goPrev = false;
    }

    if (scaleValue > 0) {
      this.element.style.transform = "translateX(" + transXValue + "px) scale(" + scaleValue + ")";
    }

    // console.log(this.goNext + " " + this.goPrev);

    // Update transition history
    this.x = transXValue;
    this.scale = scaleValue;
  }
}