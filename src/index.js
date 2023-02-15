const core = require("@actions/core");
// const github = require("@actions/github");
const { GitHub } = require("@actions/github/lib/utils");

function run() {
  try {
    const token = core.getInput("github-token", {required: true})
    // const github = new GitHub(token, {})

    const keyword_list = core.getInput("sre-list".split("|"))
    core.info("keyword_list is " + keyword_list)

    core.info("Checking body contents");
    if (!context.payload.pull_request.hasOwnProperty("body")) {
      core.setFailed("There's no body in the PR, can't check");
    } else if (context.payload.pull_request.body === "") {
      core.setFailed("The body is empty, can't check");
    } else {
      const pr_content = context.payload.pull_request.body;
      core.info("pr_content is " + JSON.stringify(pr_content))
    }
  } catch (error) {
    if (error.name === "HttpError") {
      core.setFailed(
          "There seems to be an error in an API request" +
          "\nThis is usually due to either being in a private repository" +
          "\nor at any rate using a GitHub token without the adequate scope"
      );
    } else {
      core.setFailed("❌ " + error.stack);
    }
  }
}

run();