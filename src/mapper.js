/**
 * mapperjs
 * @author: ernestohs
 */

// Requires SugarJS
if (Object.SugarMethods && Object.isObject && Object.isObject(Object.SugarMethods)) 
{

    "use strict";

    window.mapper = (function () 
                    {

                        var self = null;

                        var _profiles = [];

                        var _initizalize = function (profiles) {
                            if (Object.isArray(profiles) && !profiles.isEmpty()) 
                            {
                                var length = profiles.length;
                                for (var i = length - 1; i >= 0; i--) 
                                {
                                    var profile = profiles[i];
                                    if (Object.isObject(profile) && profile['mapType'] && Object.isFunction(profile['mapIt'])) 
                                    {
                                        _profiles.push(profile);
                                    }
                                }
                            }
                            else if (Object.isObject(profiles) && profiles['mapType'] && Object.isFunction(profiles['mapIt'])) 
                            {
                                _profiles.push(profiles);
                            }
                            else throw 
                                {
                                    name: 'MapException',
                                    message: 'The "profiles" parameter is invalid or missing.'
                                };
                        };

                        var _map = function (from, to) 
                        {

                            var result = undefined;

                            var profile = _profiles.find(function (item) { return item.mapType === to; });

                            if (profile) 
                            {
                                result = profile.mapIt(from, self);
                            } 
                            else 
                            {
                                throw 
                                {
                                    name: 'MapException',
                                    message: 'The map target is not present in the profiles list of the mapper.'
                                };
                            }

                            return result;
                        };

                        var _clear = function () { _profiles = []; };

                        self = {
                                    init: _initizalize,
                                    map: _map,
                                    dispose: _clear
                                };

                        return self;
                    })();
}
else
{
    throw {
            name: 'dependencyException',
            message: 'This code requieres SugarJS (http://sugarjs.com/)'
        };
}

