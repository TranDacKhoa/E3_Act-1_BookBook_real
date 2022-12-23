new Vue({
    el: "#idOfReport",
    data: {
        reportposts: true,
    },
    computed: {

    },
    watch: {

    },
    methods: {
        //Ham chi thi
        SkipPost: function () {
            confirm("Are you want to skip this post?");
        },
        SkipUser: function () {
            confirm("Are you want to skip this user?");
        },
        DeletePost: function () {
            confirm("Are you want to delete this post?");
        },
        DeleteUser: function () {
            confirm("Are you want to delete this user?");
        },
    }
})