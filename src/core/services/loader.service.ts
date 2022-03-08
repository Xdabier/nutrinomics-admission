import { Injectable } from '@angular/core';

const SVG_LOADER = `
<svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
   <rect fill="none" stroke="#1598e2" stroke-width="4" x="25" y="25" width="50" height="50">
  <animateTransform
     attributeName="transform"
     dur="0.5s"
     from="0 50 50"
     to="180 50 50"
     type="rotate"
     id="strokeBox"
     attributeType="XML"
     begin="rectBox.end"/>
  </rect>
   <rect x="27" y="27" fill="#1598e2" width="46" height="50">
  <animate
     attributeName="height"
     dur="1.3s"
     attributeType="XML"
     from="50"
     to="0"
     id="rectBox"
     fill="freeze"
     begin="0s;strokeBox.end"/>
  </rect>
</svg>

`;

@Injectable({
	providedIn: 'root'
})
export class LoaderService {
	private readonly _waitingLoader!: HTMLDivElement;
	private readonly _id = 'waitingLoader';

	constructor() {
		this._waitingLoader = document.createElement('div');
		this._waitingLoader.innerHTML = SVG_LOADER;
		this._waitingLoader.id = this._id;
	}

	showLoader(): void {
		if (document.getElementById(this._id)) {
			return;
		}
		const bodyCollection: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
		const body = bodyCollection.item(0);

		if (!body) {
			return;
		}
		body.appendChild(this._waitingLoader);
	}

	hideLoader(): void {
		const currentLoader = document.getElementById(this._id);
		if (!currentLoader) {
			return;
		}

		const bodyCollection: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
		const body = bodyCollection.item(0);

		if (!body) {
			return;
		}
		body.removeChild(currentLoader);
	}
}
