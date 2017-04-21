var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var StaticRouter = require('react-router').StaticRouter;
var Redux = require('redux');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var Provider = require('react-redux').Provider;
var Layout = require('../views/Layout.jsx');
var Home = require('../views/Index.jsx');
var Stats = require('../views/Stats.jsx');
var About = require('../views/About.jsx');
var NotFound = require('../views/NotFound.jsx');
var destinyNightBot = require('../destinyNightBot');

function reducer(state) { return state; }

router.get('/', function(request, response) {
    var wpSite = request.query.wpSite;
    if(wpSite == undefined)
        wpSite = "destinysapi.wordpress.com";

    var wpTag = request.query.wpTag;
    if(wpTag == undefined)
        wpTag = "character-item-api";

    destinyNightBot.wordpress(wpSite, wpTag, function(postJSON) {
        var getCharacter = null;

        var initialState = { 
            title: "Bot API's",
            content: JSON.parse(postJSON).posts[0].content
        };

        var store = Redux.createStore(reducer, initialState);

        var context = {};
        var html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={request.url} context={context}>
                    {
                        <Layout>
                            <Route exact path='/' component={Home} />
                        </Layout>
                    }
                </StaticRouter>
            </Provider>
        );

        if (context.status >= 400) {
            response.status(context.status).send(html);
        } else if (context.url) {
            response.redirect(context.status, context.url);
        } else {
            response.send(html);
        }
    });
});

router.get('/stats', function(request, response) {
    var memType = request.query.memType;
    if(memType == undefined)
        memType = "1";

    var account = request.query.account;
    if(account == undefined)
        account = "4611686018429670931";
    
    var character = request.query.character;

    var type = request.query.type;
    if(type == undefined)
        type = "ALL";

    destinyNightBot.getAccount(memType, account, function(accountJSON) {
        var getCharacter = null;

        //Get last played character or character passed in url
        destinyNightBot.character(character, accountJSON, function(c){
            getCharacter = c;
        });

        //get character json
        destinyNightBot.getCharacter(memType, account, getCharacter, function(json) {
      
            //get the characters items
            destinyNightBot.items(json, function(items) {
                var characterBase = JSON.parse(json).Response.data.characterBase;
                var items = JSON.parse(items);
                var text = "";

                if(type == "CLASS" || type == "0")
                    text = items[0].Response.data.inventoryItem.itemTypeName + " - " + items[0].Response.data.inventoryItem.itemName;
                else if(type == "HELM" || type == "1")
                    text = items[1].Response.data.inventoryItem.tierTypeName + " " + items[1].Response.data.inventoryItem.itemTypeName + " - " + items[1].Response.data.inventoryItem.itemName;
                else if(type == "ARM" || type == "2")
                    text = items[2].Response.data.inventoryItem.tierTypeName + " " + items[2].Response.data.inventoryItem.itemTypeName + " - " + items[2].Response.data.inventoryItem.itemName;
                else if(type == "CHEST" || type == "3")
                    text = items[3].Response.data.inventoryItem.tierTypeName + " " + items[3].Response.data.inventoryItem.itemTypeName + " - " + items[3].Response.data.inventoryItem.itemName;
                else if(type == "LEG" || type == "4")
                    text = items[4].Response.data.inventoryItem.tierTypeName + " " + items[4].Response.data.inventoryItem.itemTypeName + " - " + items[4].Response.data.inventoryItem.itemName;
                else if(type == "CLASSITEM" || type == "5")
                    text = items[5].Response.data.inventoryItem.tierTypeName + " " + items[5].Response.data.inventoryItem.itemTypeName + " - " + items[5].Response.data.inventoryItem.itemName;
                else if(type == "PRIMARY" || type == "6")
                    text = items[6].Response.data.inventoryItem.tierTypeName + " " + items[6].Response.data.inventoryItem.itemTypeName + " - " + items[6].Response.data.inventoryItem.itemName;
                else if(type == "SECONDARY" || type == "7")
                    text = items[7].Response.data.inventoryItem.tierTypeName + " " + items[7].Response.data.inventoryItem.itemTypeName + " - " + items[7].Response.data.inventoryItem.itemName;
                else if(type == "HEAVY" || type == "8")
                    text = items[8].Response.data.inventoryItem.tierTypeName + " " + items[8].Response.data.inventoryItem.itemTypeName + " - " + items[8].Response.data.inventoryItem.itemName;
                else
                    text = "Please set valid type paramater. Example: ?type=CLASS";
                
                response.send(text);
            });
        });
    });
});

router.get('/about', function(request, response) {
    var initialState = { title: 'Universal React' };
    var store = Redux.createStore(reducer, initialState);

    var context = {};
    var html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={request.url} context={context}>
                {
                    <Layout>
                        <Route exact path='/about' component={About} />
                    </Layout>
                }
            </StaticRouter>
        </Provider>
    );

    if (context.status >= 400) {
        response.status(context.status).send(html);
    } else if (context.url) {
        response.redirect(context.status, context.url);
    } else {
        response.send(html);
    }
});

router.get('*', function(request, response) {
    var initialState = { title: 'Universal React' };
    var store = Redux.createStore(reducer, initialState);

    var context = {};
    var html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={request.url} context={context}>
                {
                    <Layout>
                        <Route path="*" component={NotFound} />
                    </Layout>
                }
            </StaticRouter>
        </Provider>
    );

    if (context.status >= 400) {
        response.status(context.status).send(html);
    } else if (context.url) {
        response.redirect(context.status, context.url);
    } else {
        response.send(html);
    }
});

module.exports = router;
