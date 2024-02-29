import { ElaxyaActor } from "./documents/actor";
import { ElaxyaActorSheet } from "./sheets/actor";

// @ts-ignore
Hooks.once('init', function() {
  // @ts-ignore
  game.elaxya = {
    ElaxyaActor,
  }

  // @ts-ignore
  CONFIG.Combat.initiative = {
    formula: '1d20',
    decimals: 2,
  };

  // @ts-ignore
  CONFIG.Actor.documentClass = ElaxyaActor;

  // Register sheet application classes
  // @ts-ignore
  Actors.unregisterSheet('core', ActorSheet);
  // @ts-ignore
  Actors.registerSheet('elaxya', ElaxyaActorSheet, {
    makeDefault: true,
    // @ts-ignore
    label: game.i18n.localize('elaxya.sheet.actor.character.label'),
  });
});
