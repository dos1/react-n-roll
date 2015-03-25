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