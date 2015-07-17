var ColorsModule = React.createClass({
    getInitialState: function() {
        return {
            data: {
                intro: [],
                colors: []
            }
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
                {this.state.data.intro.map(function(paragraph) {
                    return <p className="huge-module__paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
                })}
                <ul className="huge-list--unstyled list-colors">
                    {this.state.data.colors.map(function(color, index) {
                        var last = index === that.state.data.colors.length - 1 ? 'end' : '';
                        return (
                            <li className={"small-12 medium-2 " + last}>
                                <div className={"color " + color.className}>
                                    <p>.{color.className}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
});