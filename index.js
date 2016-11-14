'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcssResponsiveFont', function() {

        function getUnit(x) {
            return x.replace(/[0-9.]+/g, '');
        }
        function getNumber(x) {
            return x.replace(/[a-zA-Z]+/g, '');
        }
        function pxtoem(pixels){
            return (pixels/16);
        }
        function emtopx(pixels){
            return (pixels*16);
        }
        return function (root) {

            root.walkRules(function (rule) {

                rule.walkDecls(function (decl) {

                    var prop = decl.prop;
                    var value = decl.value;

                    if (prop.indexOf('font-size-responsive') !== -1) {

                        var values = postcss.list.space(value);
                        var className = rule.selector;
                        var minFontSize = values[0];
                        var maxFontSize = values[1];
                        var minViewportSize = values[2];
                        var maxViewportSize = values[3];


                        /*
                          Assure valid declaration inputs.
                        */
                        if (getUnit(minFontSize) !== getUnit(maxFontSize)) {
                            throw rule.error('min/max unit types must match for font sizes.');
                        }
                        if (getUnit(minViewportSize) !== getUnit(maxViewportSize)) {
                            throw rule.error('min/max unit types must match for media queries.');
                        }
                        if (getUnit(minFontSize) === null || getUnit(maxFontSize) === null ||
                            getUnit(minViewportSize) === null || getUnit(maxViewportSize) === null) {
                            throw rule.error('must declare a unit value');
                        }
                        if ((getUnit(minFontSize) === "em") && (getUnit(minViewportSize) === "px")) {
                            minViewportSize = pxtoem(getNumber(minViewportSize))+"em";
                            maxViewportSize = pxtoem(getNumber(maxViewportSize))+"em";
                        }
                        if ((getUnit(minFontSize) === "px") && (getUnit(minViewportSize) === "em")) {
                            minViewportSize = emtopx(getNumber(minViewportSize))+"px";
                            maxViewportSize = emtopx(getNumber(maxViewportSize))+"px";
                        }


                        /*
                          Create rule for MIN font size.
                        */
                        var declMin = postcss.decl({
                            prop: 'font-size',
                            value: minFontSize
                        });
                        rule.append(declMin);


                        /*
                          Create rule for RESPONSIVE(vw-based) font size.
                        */
                        rule.responsiveViewport = postcss.atRule({
                            name: 'media',
                            params: '(min-width:' + minViewportSize +
                                ') and (max-width:' + maxViewportSize + ')'
                        });
                        rule.responsiveViewport.append({
                            selector: className
                        }).walkRules(function (selector) {
                            selector.append({
                                prop: 'font-size',
                                value: 'calc(' + minFontSize + ' + (' + getNumber(maxFontSize) +
                                    ' - ' + getNumber(minFontSize) + ') * ( (100vw - ' +
                                    minViewportSize + ') / ( ' + getNumber(maxViewportSize) +
                                    ' - ' + getNumber(minViewportSize) + ')))'
                            });
                        });
                        root.insertAfter(rule, rule.responsiveViewport);


                        /*
                          Create rule for MAX font size.
                        */
                        rule.largeViewport = postcss.atRule({
                            name: 'media',
                            params: '(min-width:' + minViewportSize + ')'
                        });
                        rule.largeViewport.append({
                            selector: className
                        }).walkRules(function (selector) {
                            selector.append({
                                prop: 'font-size',
                                value: maxFontSize
                            });
                        });
                        root.insertAfter(rule, rule.largeViewport);


                        /*
                          Clear original declaration.
                        */
                        decl.remove();

                    }
                });
            });
        };

    });
