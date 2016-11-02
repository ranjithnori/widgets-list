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

import {Conn, addWidget} from './database-postgres';

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
 
// var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
//   var widget = new Widget();
//   widget.name = name;
//   widget.id = `${i}`;
//   return widget;
// });

function convertToAttributesObject(model){
  return Object.assign({}, {
    type: model.type
  }, {
    ...model.dataValues
  });
}

module.exports = {
  // Export methods that your schema can use to interact with your database
  addWidget: (name) => {
    // This will add a new widget object to lemons array.
    return addWidget(name).then((widgetObject)=> {
      var data = convertToAttributesObject(widgetObject);
      let widget = new Widget();
      widget.name = data.name;
      widget.id = data.id;
      console.log('addWidgets then method', widget);
      return widget.id;
    });
  },
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => {
    // return widgets;
    return Conn.models.widget.findAll().then((widgetsArray)=> {
      var widgetsRaw = getArrayData(widgetsArray);

      var widgets = widgetsRaw.map((widget, i) => {
        let widgetObject = new Widget();
        widgetObject.name = widget.name;
        widgetObject.id = `${i}`;
        return widgetObject;
      });
      // console.log('db find all promise', widgets);
      return widgets;
    });
  },
  User,
  Widget,
};
