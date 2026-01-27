# n8n Code Node Configuration for Magnet Redirector

## Updated Code Node (Place before Slack node)

```javascript
const items = $input.all();

return items.map(item => {
  const data = item.json;
  
  // Format date
  const pubDate = new Date(data.pubDate);
  const formattedDate = pubDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get magnet link
  const magnetLink = data.link || data.enclosure?.url || '';
  
  // Create redirect URL using your domain
  const encodedMagnet = encodeURIComponent(magnetLink);
  const redirectUrl = `https://cdn.meson.one/code/?url=${encodedMagnet}`;
  
  return {
    json: {
      date: formattedDate,
      title: data.title,
      magnetLink: magnetLink,
      redirectUrl: redirectUrl,
      rawDate: data.pubDate
    }
  };
});
```

## Slack Block Configuration

Now you can use the clickable link format in your Slack blocks!

### Option 1: Simple Section with Clickable Link

In n8n Slack node:

1. **Header Block:**
   - Text: `🎬 New Episode Available`

2. **Section Block:**
   - Text field:
   ```
   *Date:* {{ $json.date }}
   *Title:* {{ $json.title }}
   
   🧲 <{{ $json.redirectUrl }}|Download via Magnet>
   ```

3. **Divider Block**

### Option 2: With Button Accessory

1. **Header Block:**
   - Text: `🎬 New Episode Available`

2. **Section Block (Fields):**
   - Field 1: `*Date:*\n{{ $json.date }}`
   - Field 2: `*Title:*\n{{ $json.title }}`

3. **Section Block with Button:**
   - Text: `🧲 Ready to download`
   - Accessory: Button
     - Text: `Get Magnet Link`
     - URL: `{{ $json.redirectUrl }}`

4. **Divider Block**

### JSON Format (if using expression mode):

```json
[
  {
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": "🎬 New Episode Available"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Date:* {{ $json.date }}\n*Title:* {{ $json.title }}\n\n🧲 <{{ $json.redirectUrl }}|Download via Magnet>"
    }
  },
  {
    "type": "divider"
  }
]
```

## How It Works

1. RSS feed provides magnet link
2. Code node creates redirect URL: `https://cdn.meson.one/code/?url=magnet:?xt=...`
3. Slack displays as clickable HTTPS link
4. When clicked:
   - Opens your redirect page
   - Page automatically redirects to magnet link
   - User's torrent client opens automatically
   - Fallback buttons shown if needed

## Example URL

Original magnet:
```
magnet:?xt=urn:btih:97DC2563582B306B393F40D1F8D8A0747872973E&dn=Chicago+PD+S13E10+720p
```

Becomes redirect URL:
```
https://cdn.meson.one/code/?url=magnet%3A%3Fxt%3Durn%3Abtih%3A97DC2563582B306B393F40D1F8D8A0747872973E%26dn%3DChicago%2BPD%2BS13E10%2B720p
```

## Deployment Instructions

1. Upload `index.html` to `https://cdn.meson.one/code/`
2. Make sure the file is accessible at that exact path
3. Test by visiting: `https://cdn.meson.one/code/?url=magnet:?xt=urn:btih:TEST`
4. Update your n8n Code node with the script above
5. Update Slack blocks to use `{{ $json.redirectUrl }}`

## Complete Workflow Structure

```
[Schedule Trigger]
    ↓
[RSS Feed Read]
    ↓
[Code Node - Format Data + Create Redirect URL]
    ↓
[Slack - Send Message with Clickable Link]
```

Now your Slack messages will have proper clickable links that work!
