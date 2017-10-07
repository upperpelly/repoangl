"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var homecomponent_1 = require("./homecomponent");
var subscribecomponent_1 = require("./subscribecomponent");
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: homecomponent_1.HomeComponent },
    { path: 'subscribe', component: subscribecomponent_1.SubscribeComponent },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map