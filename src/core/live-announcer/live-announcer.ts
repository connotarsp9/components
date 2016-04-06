import {Injectable} from 'angular2/core';

export type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

@Injectable()
export class MdLiveAnnouncer {

  private _liveElement: Element;

  constructor() {
    this._liveElement = this._createLiveElement();
  }

  /**
   * @param message Message to be announced to the screenreader
   * @param politeness The politeness of the announcer element.
   */
  announce(message: string, politeness: AriaLivePoliteness = 'polite'): void {
    this._liveElement.textContent = '';

    // TODO: ensure changing the politeness works on all environments we support.
    this._liveElement.setAttribute('aria-live', politeness);

    // This 100ms timeout is necessary for some browser + screen-reader combinations:
    // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
    // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
    //   second time without clearing and then using a non-zero delay.
    // (using JAWS 17 at time of this writing).
    setTimeout(() => this._liveElement.textContent = message, 100);
  }

  private _createLiveElement(): Element {
    let liveEl = document.createElement('div');

    liveEl.classList.add('md-live-announcer');
    liveEl.setAttribute('aria-atomic', 'true');
    liveEl.setAttribute('aria-live', 'polite');

    document.body.appendChild(liveEl);

    return liveEl;
  }

}
