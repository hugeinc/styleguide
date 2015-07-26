var ButtonsModule = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    data: data.items
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var that = this;

        return (
            <div>
                <ul className="huge-list--unstyled">
                    {this.state.data.map(function(button, index) {
                    		var buttonClass = button.className + " snippet";

                        return (
                            <li>
                                <a href="#" className={buttonClass}>
                                	{button.buttonName}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
});