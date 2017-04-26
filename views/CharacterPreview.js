var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var classes = {"3655393761": "Titan", "671679327": "Hunter", "2271682572": "Warlock"}
var race = {"2803282938": "Awoken", "3887404748": "Human", "898834093": "Exo"}
var gender = {"0": "Male", "1": "Female"}

var CharacterPreview = createReactClass({
  render: function() {
    var custom = this.props.custom;
    var bgImage = "https://www.bungie.net" + custom.json.backgroundPath;
    var style = {
        background: 'url("'+ bgImage + '") no-repeat' 
    }
    return (
      <div className="character-preview" style={style}>
        <img src={"https://www.bungie.net" + custom.json.emblemPath}/>
        <div className="characterInfo">
          <h2 className="name">{classes[custom.json.characterBase.classHash]}</h2>
          <div className="light">Light {custom.json.characterBase.powerLevel}</div>
          <h4 className="race">{race[custom.json.characterBase.raceHash] + " " + gender[custom.json.characterBase.genderType]}</h4>
          <h4 className="level">Level {custom.json.levelProgression.level}</h4>
        </div>
      </div>
  );
  }
});

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(CharacterPreview);