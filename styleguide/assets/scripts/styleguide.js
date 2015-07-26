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
                            <li className={"small-12 medium-2 columns " + last}>
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