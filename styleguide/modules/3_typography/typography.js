var TypographyModule = React.createClass({
    getInitialState: function() {
        return {
            data: {
                intro: [],
                fonts: [],
                paragraphs: [],
                paragraphsName: null
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
        return (
            <div>
                {this.state.data.intro ? this.state.data.intro.map(function(paragraph) {
                    return <p className="huge-module__paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
                }) : ''}
                <div className="titles">
                    {this.state.data.fonts.map(function(font) {
                        var heading = '<h' + font.heading + ' class="' + font.className + '">' + font.title + '</h' + font.heading + '>';

                        return (
                            <div>
                                <h4 className="huge-module__title--light">{font.fontName} - {font.fontSize}</h4>
                                <div dangerouslySetInnerHTML={{ __html: heading }} />
                            </div>
                        );
                    })}
                </div>
                <br />
                <h5 className="huge-module__title--small">{this.state.data.paragraphsName}</h5>
                {this.state.data.paragraphs.map(function(paragraph) {
                    return <p className={paragraph.className} dangerouslySetInnerHTML={{ __html: paragraph.text }} />
                })}
            </div>
        );
    }
});