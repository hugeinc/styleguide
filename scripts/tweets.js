import $ from 'jquery'

export default {
    init: function() {
        this.$tweets = $('.tweetUrl');
        this.$tweetsContainer = $('.tweetsContainer ul');
        this.renderTweets();
    },
    renderTweets: function() {
        var that = this,
            tweetsHtml = [];

        this.fetchTweets(function(html, i) {
            tweetsHtml[i] = '<li>' + html + '</li>';

            if (i == that.$tweets.length - 1) {
                that.$tweetsContainer.append(tweetsHtml.join(''));
            }
        });
    },
    fetchTweets: function(renderTweetsCallback) {
        var that = this;

        $.each(this.$tweets, function(i, el) {
            that.fetchSingleTweet($(this).val(), function(html) {
                renderTweetsCallback(html.replace('<blockquote', '<blockquote data-cards="hidden" data-conversation="none"'), i);
            });
        });
    },
    fetchSingleTweet: function(url, fetchTweetsCallback) {
        if (typeof url === 'undefined') return false;

        window.jsonpCallback = function(data) {
            if (data.html) fetchTweetsCallback(data.html);
        };

        $.ajax({
            url: 'https://api.twitter.com/1/statuses/oembed.json?url=' + url,
            dataType: "jsonp",
            jsonpCallback: "jsonpCallback"
        });
    }
}