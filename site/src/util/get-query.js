define(["underscore", "query-string"], function (_, queryString) {
    return function (route) {
        // Handle an array or a string.
        route = route instanceof Array ? _.last(route) : route;

        // Try to extract the query string.
        var matches = route.match(/(\?.+)/);

        // If we got matches, grab the first one, and skip the first character.
        if (matches) {
            return queryString.parse(matches[0].slice(1));
        }

        return null;
    };
});