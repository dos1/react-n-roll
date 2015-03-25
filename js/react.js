var Kitteh = React.createClass({
	render: function() {
		return (
			<img src="https://aroundustyroads.files.wordpress.com/2014/01/kitten.png" />
		);
	}
});
React.render(
	<Kitteh />,
	document.getElementById('a-place-for-kitteh')
);

//----------

var GlowinKitteh = React.createClass({
	render: function() {
		return (
			<img src="https://aroundustyroads.files.wordpress.com/2014/01/kitten.png" style={{ boxShadow: "0px 0px 100px " + this.props.color }} />
		);
	}
});
React.render(
	<GlowinKitteh color="magenta" />,
	document.getElementById('a-place-for-glowin-kitteh')
);

//----------

var RandomKitteh = React.createClass({

	componentDidMount: function() {
		var parseJson = function (response) {
			return response.json();
		};
		
		window.fetch("kitty.php").then(parseJson).then((function (response) {
			if (this.isMounted()) {
				this.setState(response);
			}
		}).bind(this));
	},
	
	render: function() {
		return (this.state ? (
			<div>
				<img src={ this.state.url } />
				<p className="link"><a target="_blank" href={ this.state.source }>{ this.state.source }</a></p>
			</div>
		) : (
			<p>Loading kitteh...</p>
		));
	}
});

var doTheKitteh = function() {
if (window.location.hash === "#/slide-kitteh") {
	React.render(
		<RandomKitteh />,
		document.getElementById('a-place-for-random-kitteh')
	);
	}
};
doTheKitteh();
window.addEventListener('hashchange', doTheKitteh);

//----------------

var InteractiveKittehs = React.createClass({
	
	componentDidMount: function() {
		this.setState({kittehs: []});
		this.addKitteh();
	},
	
	addKitteh: function() {

		var parseJson = function (response) {
			return response.json();
		};
		
		this.setState({loading: true});
		
		window.fetch("kitty.php").then(parseJson).then((function (response) {
			if (this.isMounted()) {
				this.setState({loading: false, kittehs: this.state.kittehs.concat([ <OneKitteh key={this.state.kittehs.length} data={response} /> ])});
			}
			return false;
		}).bind(this));
	},
	
	clearKittehs: function() {
		this.setState({ kittehs: [] });
	},
	
	render: function() {
		var link = (this.state && this.state.loading) ? "Loading" : (<span className="link"><a onClick={ this.addKitteh }>Moar kittehs!!!11one</a> | <a onClick={ this.clearKittehs }>Clear</a></span>);
	
		return (this.state ? (
			<div>
				<div className="kittehs-box">
					{ this.state.kittehs }
				</div>
				{ link }
			</div>
		) : (
			<p>Loading kitteh...</p>
		));
	}
	});

var OneKitteh = React.createClass({
	handleClick: function() {
		var colors = ['magenta', 'yellow', 'lightgreen', 'blue', 'red', 'black'];
		var color = colors[Math.floor(Math.random() * colors.length)];
		this.setState({color: color });
	},

	render: function() {
		return (
			<div>
				<img src={ this.props.data.url } style={{ boxShadow: "0px 0px 100px " + (this.state ? this.state.color : "transparent") }} onClick={ this.handleClick } />
				<p className="link"><a target="_blank" href={ this.props.data.source }>{ this.props.data.source }</a></p>
			</div>
		);
	}
});

var doTheKittehs = function() {
if (window.location.hash === "#/slide-kittehs") {
	React.render(
		<InteractiveKittehs />,
		document.getElementById('a-place-for-kittehs')
	);
	}
};
doTheKittehs();
window.addEventListener('hashchange', doTheKittehs);
