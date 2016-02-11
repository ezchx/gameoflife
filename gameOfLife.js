// initialize variables
var elements = [];
var width = 50;
var boxNum = '';
var generation = 0;


// format individual box
var Box = React.createClass({
  
  render: function() {
    if (this.props.param === 0) {
      return (<div id={"box" + this.props.count} className="boxyBlack">&nbsp;</div>);
    } else {
      return (<div id={"box" + this.props.count} className="boxyRed">&nbsp;</div>);
    }
  }
});


// display matrix
var LifeMatrix = React.createClass({
  
 render: function() {
    var count = -1;
    var components = this.props.elements.map(function(b) {
      count += 1;
      return <Box param={b} count={count} elements={elements}/>;
    });
    
    // group into chunks equal to width
    var groups = [];
    var children = [];
    while(components.length > 0) {
      children.push(components.shift());
      if (children.length === width) {
        groups.push(<div className="oneRow">{children}</div>);
        children = [];
      }
    }

    return (
      <div className="lifeMatrix">
        {groups}
      </div>
    );
  }
});


// main box
var LifeBox = React.createClass({
  
  getInitialState: function() {
    return {elements: [], generation: 0};
  },
  
  // set initial random array
  componentDidMount: function() {
    var width = 50;
    var height = 30;
    var elements = [];
    var generation = 0;
    for (var x = 0; x < (height*width); x++) {
      elements.push(Math.round(Math.random()));
    };
    this.setState({elements: elements});
    this.setState({generation: generation});
    this.delayTimer();
  },
  
  clearGame: function() {
    var width = 50;
    var height = 30;
    var elements = [];
    for (var x = 0; x < (height*width); x++) {
      elements.push(0);
    };
    this.setState({elements: elements});
    this.setState({generation: 0});
    $(".goBabyGo").prop("disabled",false);
    clearInterval(this._timer);
  },
  
  pauseGame: function() {
    $(".goBabyGo").prop("disabled",false);
    clearInterval(this._timer);
  },
  
  delayTimer: function() {
    $(".goBabyGo").prop("disabled",true);
    var self = this;
    var interval = 200;
    setTimeout(function() {
      if (!self.isMounted()) { return; } // abandon 
      self.runGame(); // do it once and then start it up ...
      self._timer = setInterval(self.runGame.bind(self), interval);
    });
  },  
    
  runGame: function() {
    var w = 50;
    var h = 30;
    var elements2 = [];
    // apply the rules of life
    for (var x = 0; x < (w*h); x++) {
      // calculate value of neighbors
      
      // top left
      if (x === 0) {
        var neighbors =
            this.state.elements[x-(w+1)+(h*w)+w] +
            this.state.elements[x-(w)+(h*w)] +
            this.state.elements[x-(w-1)+(h*w)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)+w] +
            this.state.elements[x-1+w]
        var neighbors2 = neighbors;
      }
      // top right
      else if (x === (w-1)) {
        var neighbors =
            this.state.elements[x-(w+1)+(h*w)] +
            this.state.elements[x-(w)+(h*w)] +
            this.state.elements[x-(w-1)+(h*w)-w] +
            this.state.elements[x+1-w] +
            this.state.elements[x+(w+1)-w] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)] +
            this.state.elements[x-1]
      }
      // bottom right
      else if (x === ((w*h)-1)) {
        var neighbors =
            this.state.elements[x-(w+1)] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)-w] +
            this.state.elements[x+1-w] +
            this.state.elements[x+(w+1)-(h*w)-w] +
            this.state.elements[x+(w)-(h*w)] +
            this.state.elements[x+(w-1)-(h*w)] +
            this.state.elements[x-1]
      }
      // bottom left
      else if (x === ((w*h)-w)) {
        var neighbors =
            this.state.elements[x-(w+1)+w] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)-(h*w)] +
            this.state.elements[x+(w)-(h*w)] +
            this.state.elements[x+(w-1)-(h*w)+w] +
            this.state.elements[x-1+w]
      }
      // rest of top
      else if (x >= 1 && x <= (w-2)) {
        var neighbors =
            this.state.elements[x-(w+1)+(h*w)] +
            this.state.elements[x-(w)+(h*w)] +
            this.state.elements[x-(w-1)+(h*w)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)] +
            this.state.elements[x-1]
      }
      // rest of bottom
      else if (x >= ((w*h)-w+1) && x <= ((w*h)-2)) {
        var neighbors =
            this.state.elements[x-(w+1)] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)-(h*w)] +
            this.state.elements[x+(w)-(h*w)] +
            this.state.elements[x+(w-1)-(h*w)] +
            this.state.elements[x-1]
      }
      // rest of left
      else if (x % w === 0 && x > 0) {
        var neighbors =
            this.state.elements[x-(w+1)+w] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)+w] +
            this.state.elements[x-1+w]
      }
      // rest of right
      else if ((x+1) % w === 0 && x > 0) {
        var neighbors =
            this.state.elements[x-(w+1)] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)-w] +
            this.state.elements[x+1-w] +
            this.state.elements[x+(w+1)-w] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)] +
            this.state.elements[x-1]
      }
      // rest of the rest
      else {
        var neighbors =
            this.state.elements[x-(w+1)] +
            this.state.elements[x-(w)] +
            this.state.elements[x-(w-1)] +
            this.state.elements[x+1] +
            this.state.elements[x+(w+1)] +
            this.state.elements[x+(w)] +
            this.state.elements[x+(w-1)] +
            this.state.elements[x-1]
      }
      if (neighbors <= 1) {elements2.push(0);}
      if (neighbors === 2) {elements2.push(this.state.elements[x]);}
      if (neighbors === 3) {elements2.push(1);}
      if (neighbors >= 4) {elements2.push(0);}
      if(elements2[x] === 0) {$("#box" + x).removeClass('boxyRed').addClass('boxyBlack');}
      $("#hideMe").html("");
    };
    this.state.generation += 1;
    this.setState({elements: elements2});
  },
  
  // change box on click
  changeBox: function() {
    var dippy = $("#hideMe").text();
    if (this.state.elements[dippy] === 0) {
      this.state.elements[dippy] = 1;
      $("#box" + dippy).removeClass('boxyBlack').addClass('boxyRed');
    } else {
      this.state.elements[dippy] = 0;
      $("#box" + dippy).removeClass('boxyRed').addClass('boxyBlack');
    }
    //$("#debug").html(dippy + " " + this.state.elements[dippy]);
  },  
  
  
  
  render: function() {
    return (
      <div className="lifeBox" onClick={this.changeBox.bind(this, elements)}>
        <h1>The Game of Life</h1>
        <h3>Generation: {this.state.generation}</h3>
        <input type="button" id="" className="btn-sm btn-success button goBabyGo" onClick={this.componentDidMount.bind(this, elements)} value="Start" />
        <input type="button" id="" className="btn-sm btn-primary button goBabyGo" onClick={this.delayTimer.bind(this, elements)} value="Resume" />
        <input type="button" id="pauser" className="btn-sm btn-warning button" onClick={this.pauseGame.bind(this, elements)} value="Pause" />
        <input type="button" className="btn-sm btn-danger button" onClick={this.clearGame.bind(this, elements)} value="Clear" />        
        <LifeMatrix elements={this.state.elements} />
      </div>
    );
  }
});


ReactDOM.render(
  <LifeBox elements={elements} />,
  document.getElementById('content')
);

$("[id^=box]").on('click', function () {
  var boxNum = this.id.replace("box","");
  $("#hideMe").html(boxNum);
});
  