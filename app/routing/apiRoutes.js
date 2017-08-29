var friendsData = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res){
		
		var user = req.body;

		for (var i = 0; i < user.scores.length; i++) {
			user.scores[i] = parseInt(user.scores[i]);
		}


				var diff = [];

				for (var i = 0; i < friendsData.length; i++) {
					var goodFriend = friendsData[i];

					var totalDiff = 0;

					for (var j = 0; j < goodFriend.scores.length; j++) {
						var balance = Math.abs(goodFriend.scores[j] - user.scores[j]);
						totalDiff += balance
					}

					diff[i] = totalDiff;
				}


						var diffUser = diff[0];
						var bestMatch = 0;

						for (var i = 0; i < diff.length; i++) {
							if (diff[i] < diffUser) {
								diffUser = diff[i];
								bestMatch = i;
							}
						}

		friendsData.push(user);

		res.json(friendsData[bestMatch]);
	});

};