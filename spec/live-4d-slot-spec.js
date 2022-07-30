'use babel';

import Live4dSlot from '../lib/live-4d-slot';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Live4dSlot', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('live-4d-slot');
  });

  describe('when the live-4d-slot:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.live-4d-slot')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'live-4d-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.live-4d-slot')).toExist();

        let live4dSlotElement = workspaceElement.querySelector('.live-4d-slot');
        expect(live4dSlotElement).toExist();

        let live4dSlotPanel = atom.workspace.panelForItem(live4dSlotElement);
        expect(live4dSlotPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'live-4d-slot:toggle');
        expect(live4dSlotPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.live-4d-slot')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'live-4d-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let live4dSlotElement = workspaceElement.querySelector('.live-4d-slot');
        expect(live4dSlotElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'live-4d-slot:toggle');
        expect(live4dSlotElement).not.toBeVisible();
      });
    });
  });
});
