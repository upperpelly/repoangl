"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customvalidations = (function () {
    function customvalidations() {
    }
    customvalidations.OneValidator = function (group) {
        var isAtLeastOne = false;
        if (group && group.controls) {
            for (var control in group.controls) {
                if (group.controls.hasOwnProperty(control) && group.controls[control].valid && group.controls[control].value) {
                    isAtLeastOne = true;
                    break;
                }
            }
        }
        return isAtLeastOne ? null : { 'required': true };
    };
    return customvalidations;
}());
exports.customvalidations = customvalidations;
//# sourceMappingURL=customvalidations.js.map