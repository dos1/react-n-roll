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
		
		window.fetch("kitty.php").then(parseJson).then((function(response) {
			this.setState(response);
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
window.addEventListener('hashchange', function() {
  if (window.location.hash === "#/slide-kitteh") {
		React.render(
			<RandomKitteh />,
			document.getElementById('a-place-for-random-kitteh')
		);
	}
});