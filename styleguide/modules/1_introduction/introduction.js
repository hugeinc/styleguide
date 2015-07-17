var IntroductionModule = React.createClass({
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
        return (
          <div className="feedback">
            {this.state.data.map(function(paragraph) {
                return <p className="huge-module__paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
            })}
          </div>
        );
    }
});