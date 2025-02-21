// injuect CSS to highlight tabs

const categories = {
    "Social Media": ["twitter.com", "facebook.com", "instagram.com", "x.com"],
    "News": ["nytimes.com", "cnn.com", "bbc.com", "foxnews.com"],
    "Shopping": ["amazon.ca", "etsy.com", "walmart.ca","realcanadiansuperstore.ca"],
    "Work": ["slack.com", "github.com", "trello.com", "jira.com"],
    "Entertainment": ["youtube.com", "netflix.com", "hulu.com", "spotify.com","primevideo.com"],
    "Health": ["webmd.com", "cdc.gov"],
    "Finance": ["td.com", "rbc.com", "capitalone.com"],
    "Education": ["khanacademy.org", "coursera.org", "udemy.com","coursehero.com","chegg.com"],};
const colors = {
    "Social Media": "#FF0000",
    "News": "#FFA500",
    "Shopping": "#FFFF00",
    "Work": "#008000",
    "Entertainment": "#0000FF",
    "Health": "#800080",
    "Finance": "#FF00FF",
    "Education": "#00FFFF",
};
//get active tab
chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    const tab = tabs[0]; 
    const domain = getDomain(tab.url);
    console.log(domain);
    // categorize tab based on domain
    const cat = categorizeTab(domain);

});
function categorizeTab(domain){
    // categorize tab based on domain
    for (let cat in categories){
        if (categories[cat].includes(domain)){
            colorTab(tab, colors[cat]);
            chrome.tabs.executeScript(tab.id,{
                code: 'document.title = "Category: ' + cat + ' - " + document.title;'
            });
            return cat;
        }
    }
}
function getDomain(url){
    // get domain from url
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
}
function colorTab(tab, col){
   chrome.theme.update(tab.id, {
       colors: {
           frame: col,
           toolbar: col,
           tab_text: "#FFFFFF"
       }
   });
}
