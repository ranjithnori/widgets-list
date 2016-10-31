/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User {}
class Widget {}

import Db from './database-postgres';

import {
  getArrayData,
  getModelsByClass
} from 'sequelize-relay';

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

  // let widgets = getModelsByClass(Db.models.widget);
// console.log('widgetsArray', widgetsArray);
 
var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
  var widget = new Widget();
  widget.name = name;
  widget.id = `${i}`;
  return widget;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => {
    console.log('getWidgets', widgets);
    // return widgets;
    return Db.models.widget.findAll().then((widgetsArray)=> {
      var widgetsRaw = getArrayData(widgetsArray);

      var widgets = widgetsRaw.map((widget, i) => {
        let widgetObject = new Widget();
        widgetObject.name = widget.name;
        widgetObject.id = `${i}`;
        return widgetObject;
      });
      console.log('db find all promise', widgets);
      return widgets;
    });
  },
  User,
  Widget,
};
