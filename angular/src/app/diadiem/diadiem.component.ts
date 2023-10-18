import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-diadiem",
  templateUrl: "./diadiem.component.html",
  styleUrls: ["./diadiem.component.css"],
})
export class DiadiemComponent implements OnInit, OnDestroy, AfterViewInit {
  private isMouseDown: boolean = false;
  private prevMouseX: number = 0;
  private prevPercentage: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize your component here, if needed
  }

  ngAfterViewInit(): void {
    // Run code after the DOM is fully loaded
    const track = document.getElementById("image-track");

    if (!track) {
      console.error("Element with ID 'image-track' not found.");
      return;
    }

    track.addEventListener("mousedown", this.handleMouseEvent.bind(this));
    track.addEventListener("touchstart", this.handleTouchEvent.bind(this), {
      passive: false,
    });
    window.addEventListener("mouseup", this.handleMouseEvent.bind(this));
    window.addEventListener("touchend", this.handleTouchEvent.bind(this));
    window.addEventListener("mousemove", this.handleMouseEvent.bind(this));
    window.addEventListener("touchmove", this.handleTouchEvent.bind(this), {
      passive: false,
    });
  }

  ngOnDestroy(): void {
    // Clean up event listeners when the component is destroyed
    window.removeEventListener("mouseup", this.handleMouseEvent.bind(this));
    window.removeEventListener("touchend", this.handleTouchEvent.bind(this));
    window.removeEventListener("mousemove", this.handleMouseEvent.bind(this));
    window.removeEventListener("touchmove", this.handleTouchEvent.bind(this));
  }

  private handleMouseEvent(e: MouseEvent): void {
    if (e.type === "mousedown") {
      this.isMouseDown = true;
      this.prevMouseX = e.clientX;
    } else if (e.type === "mouseup") {
      this.isMouseDown = false;
    } else if (e.type === "mousemove" && this.isMouseDown) {
      this.handleMove(e.clientX);
    }
  }

  private handleTouchEvent(e: TouchEvent): void {
    if (e.type === "touchstart" && e.touches.length === 1) {
      this.isMouseDown = true;
      this.prevMouseX = e.touches[0].clientX;
    } else if (e.type === "touchend") {
      this.isMouseDown = false;
    } else if (
      e.type === "touchmove" &&
      this.isMouseDown &&
      e.touches.length === 1
    ) {
      this.handleMove(e.touches[0].clientX);
    }
  }

  private handleMove(clientX: number): void {
    const mouseDelta = this.prevMouseX - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = this.prevPercentage + percentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    this.prevPercentage = nextPercentage;
    this.prevMouseX = clientX;

    const track = document.getElementById("image-track");
    if (track) {
      track.animate(
        {
          transform: `translate(${nextPercentage}%,0%)`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }

    const images = document.getElementsByClassName("image");
    for (let i = 0; i < images.length; i++) {
      const image = images[i] as HTMLElement;
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  }
}
