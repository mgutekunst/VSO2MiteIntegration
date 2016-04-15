/// <reference path='../../typings/main.d.ts' />
/// <reference path='MiteSettingsClient.ts'/>

import settings = require('MiteSettingsClient');

var Settings = new settings.MiteSettingsClient();

var form = document.getElementById('settingsForm');
Settings.loadData(form);

var button = document.getElementById('saveButton');
button.onclick = function () {
    Settings.save(form);
}
