import { Component } from 'react';
import './Projects.css';

// List of animation handler objects
var AnimateScrollList = [];
// Index of item in array to animate
var idx = 0;

// Scroll handler
document.addEventListener("wheel", (evt) => {
  var container = document.getElementsByClassName("Projects")[0];
  container.style.opacity = "1"; // unhide

  const direction = Math.sign(evt.wheelDeltaY);
  AnimateScrollList[idx].scroll(direction);
  if (AnimateScrollList[idx].getGoNext() === true && idx !== AnimateScrollList.length-1) {idx++}
  else if (AnimateScrollList[idx].getGoPrev() === true && idx !== 0) {idx--}
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
    if (AnimateScrollList.length === 0) {
      var container = document.getElementsByClassName("Projects")[0];
      var li1 = document.querySelector(".Projects > li");
      var leftAmt = window.innerWidth / 2 - li1.offsetWidth / 2;
      var topAmt = window.innerHeight / 2 - li1.offsetHeight / 2;
      container.style.left = leftAmt + "px";
      container.style.top = topAmt + "px";

      let lists = document.querySelectorAll(".Projects > li");
      lists.forEach(function(list, idx) {

        if (idx === 0) {
          AnimateScrollList.push(new AnimateScroll(list, FirstOrLast.First));
          return
        } else if (idx === lists.length-1) {
          AnimateScrollList.push(new AnimateScroll(list, FirstOrLast.Last));
        } else {
          AnimateScrollList.push(new AnimateScroll(list, null));
        }
      });
    }
  }
}

const FirstOrLast = {
  First: 0,
  Last: 1
}

class AnimateScroll {
  defX;
  defScale = 0.5;
  goNext = false;
  goPrev = false;

  getGoNext() {
    return this.goNext;
  }
  getGoPrev() {
    return this.goPrev;
  }

  constructor(element, firstOrLast) {
    this.firstOrLast = firstOrLast;
    this.element = element;

    var container = document.getElementsByClassName("Projects")[0];
    const distToRightSideWindow = container.offsetWidth - element.getBoundingClientRect().right;
    this.defX = distToRightSideWindow;
    console.log(this.defX)

    // Track current values
    this.x = this.defX;
    this.scale = this.defScale;

    element.style.opacity = "0";
    element.style.transform = "scale(" + this.defScale + ") translateX(" + this.defX + "px)";
  }

  // Do animation when scroll (up or down)
  scroll(direction) {
    // Scroll step values
    const xStep = 100;
    const scaleStep = 0.2;
    
    var transXValue = direction*xStep + this.x;
    var scaleValue = -direction*scaleStep + this.scale;

    if (transXValue < -this.defX) {
      if (this.firstOrLast === FirstOrLast.Last) {return} // Don't transition

      this.element.style.opacity = "0";
      this.element.style.transform = "translateX(" + this.x + "px)";
      
      this.goNext = true;
      this.goPrev = false;

      return
    } else if (transXValue > this.defX) {
      if (this.firstOrLast === FirstOrLast.First) {return} // Don't transition

      this.element.style.opacity = "0";
      this.element.style.transform = "translateX(" + this.x + "px) scale(" + this.defScale + ")";

      this.goNext = false;
      this.goPrev = true;
      return
    } else {
      this.element.style.opacity = "1";

      this.goNext = false;
      this.goPrev = false;
    }

    this.element.style.transform = "translateX(" + transXValue + "px)";

    // console.log(this.goNext + " " + this.goPrev);

    // Update transition history
    this.x = transXValue;
    this.scale = scaleValue;
  }
}