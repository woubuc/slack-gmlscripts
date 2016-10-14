# GMLScripts for Slack

### What is it?
A Webtask.io script that powers a Slack command to fetch GML scripts from GMLScripts.com

### Woah
Yeah. I know. It's a pretty niche thing.

### Why did you make it?
1. I wanted to try out [Webtask](https://webtask.io/)
2. I was chatting in the [Gamemaker Slack group](https://gamemakerdevs.herokuapp.com/) and someone mentioned [GMLScripts.com](http://www.gmlscripts.com/)
3. I figured it'd be fun and simple to make
4. I needed a break from C++

### Okay, so how do I use it?

#### Step 1: Create a slash command in Slack
1. In your Slack team, go in the big dropdown menu to "Apps & integrations" and click in the top-right corner on "Build"
2. Click "Make custom integration", then choose "Slash commands"
3. Choose your command. I suggest `/gmlscript` but you can make it `/pineapple` too if you so desire
4. On the next page, scroll down to "Token" and copy the generated token

#### Step 2: Create your Webtask
1. Create a new webtask from the `gmlscript.js` script in this repository
2. Add a secret called `slack_token` and set its value to the token you copied from the slash command configuration
3. Copy the webtask's URL

#### Step 3: Configure your slash command
1. Paste the webtask's URL into the URL field on the slash command config page
2. Customise the name and the icon however you wish. I named mine `GMLScript Geek` and used the emoji `:nerd_face:`
3. If you want, add autocomplete help text
4. Click "Save integration"
5. Done!

## Bugs
If you find any bugs in this code, feel free to create an issue or fix it and create a PR.

I'm not planning to add more functionality to this script, but if you have a really great idea feel free to reach out to me on [Twitter](https://twitter.com/woubuc).