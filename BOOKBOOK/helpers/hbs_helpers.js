module.exports = {
    gender: (gender) => {
        if (gender === "male") {
            return '<div class="form-check">'
                    +'<input class="form-check-input" type="radio" name="flexRadioDefault" id="male"'
                        +'value="male" checked />'
                    +'<label class="form-check-label" for="flexRadioDefault1">'
                        +'Male'
                    +'</label>'
                +'</div>'
                +'<div class="form-check">'
                    +'<input class="form-check-input" type="radio" name="flexRadioDefault"'
                        +'value="female" id="female" />'
                    +'<label class="form-check-label" for="flexRadioDefault2">'
                        +'Female'
                    +'</label>'
                +'</div>'
        }
        else {
            return '<div class="form-check">'
                    +'<input class="form-check-input" type="radio" name="flexRadioDefault" id="male"'
                        +'value="male"/>'
                    +'<label class="form-check-label" for="flexRadioDefault1">'
                        +'Male'
                    +'</label>'
                +'</div>'
                +'<div class="form-check">'
                    +'<input class="form-check-input" type="radio" name="flexRadioDefault"'
                        +'value="female" id="female" checked />'
                    +'<label class="form-check-label" for="flexRadioDefault2">'
                        +'Female'
                    +'</label>'
                +'</div>'
        }
    },
    eq: (str1, str2) => {
        return str1 === str2
    },
    eachFollowers: (arr, options) => {
        let ret = "";
        for (let i = 0; i < arr.length; i++) {
            if (i == 3) {
                break;
            }
            console.log(arr[i].dataValues.usr_follow_user_profile.dataValues)
            ret += options.fn({usr_follow: arr[i].dataValues.usr_follow_user_profile.dataValues})
        }
        return ret
    },
    eachFollowing: (arr, options) => {
        let ret = "";
        for (let i = 0; i < arr.length; i++) {
            if (i == 3) {
                break;
            }
            console.log(arr[i].dataValues.usr_followed_user_profile.dataValues)
            ret += options.fn({usr_followed: arr[i].dataValues.usr_followed_user_profile.dataValues})
        }
        return ret
    },
    isFollowing: (username, followers) => {
        for (let i = 0; i < followers.length; i++) {
            console.log(followers[i].dataValues.usr_follow)
            if (username === followers[i].dataValues.usr_follow) {
                return true
            }
        }

        return false
    }
}