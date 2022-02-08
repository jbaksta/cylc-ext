import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { URLExt } from '@jupyterlab/coreutils';

/*import { ITranslator } from '@jupyterlab/translation';*/


/**
 * Initialization data for the cylc-ext extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'cylc-ext:plugin',
  autoStart: true,
  requires: [ICommandPalette,JupyterFrontEnd.IPaths],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    paths: JupyterFrontEnd.IPaths
  ) => {
    console.log('JupyterLab extension cylc-ext is activated!');

    const { commands } = app;

    const baseUrl = paths.urls.base;
    const hubHost = paths.urls.hubHost || '';
    const hubPrefix = paths.urls.hubPrefix || '';
    const hubUser = paths.urls.hubUser || '';
    const hubServerName = paths.urls.hubServerName || '';
    var tgtUrl = '';

    if (!hubPrefix) {
      tgtUrl = baseUrl + URLExt.join('','cylc');
    } else {
      tgtUrl = hubHost + URLExt.join(hubPrefix,hubUser,hubServerName,'cylc');
    }

    console.log('Base URL: ' + baseUrl);

    const command = 'ncar:cylc-menu';
    commands.addCommand(command, {
      label: 'Cylc GUI',
      caption: 'Open the Cylc Web GUI',
      execute: (args: any) => {
        console.log(
          `ncar:cylc-menu has been called ${args['origin']}`
        );
        window.open(tgtUrl,'_blank');
      },
    });

    const category = 'Cylc Menu';
    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });
      
  }
};

export default plugin;
