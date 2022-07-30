'use babel';

import Live4dSlotView from './live-4d-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  live4dSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.live4dSlotView = new Live4dSlotView(state.live4dSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.live4dSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'live-4d-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.live4dSlotView.destroy();
  },

  serialize() {
    return {
      live4dSlotViewState: this.live4dSlotView.serialize()
    };
  },

  toggle() {
    console.log('Live4dSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
