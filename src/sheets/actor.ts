
// @ts-ignore
export class ElaxyaActorSheet extends ActorSheet {
  static get defaultOptions() {
    const defaultOptions = super.defaultOptions;

    const overrideOptions = {
      classes: ['elaxya-window', 'window-content'],
      width: 600,
      height: 800,
      tabs: [
        {
          navSelect: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        }
      ]
    }

    // @ts-ignore
    const mergedData = foundry.utils.mergeObject(defaultOptions, overrideOptions);
    return mergedData;
  }

  get template() {
    // @ts-ignore
    return `systems/elaxya/system/templates/actor-${this.actor.type}-sheet.hbs`
  }

  getData() {
    const context = super.getData();

    const actorData = context.data;

    context.system = actorData.system;
    context.flags = actorData.flags;

    if (actorData.type == 'character') {
      this.#prepareCharacterData(context);
    }

    context.rollData = context.actor.getRollData();

    return context;
  }

  #prepareItems(context: any) {

  }

  #prepareCharacterData(context: any) {

  }
}
