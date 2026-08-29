import json
import os
import random
from datetime import datetime, timedelta

base_dir = r"C:\Users\agarw\.gemini\antigravity\scratch\chef-ecosystem\src\data"
os.makedirs(base_dir, exist_ok=True)

def write_js(filename, var_name, data):
    path = os.path.join(base_dir, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"export const {var_name} = {json.dumps(data, indent=2)};\n")

# -- CUISINES --
cuisine_names = ["Continental", "Asian", "Chinese", "Italian", "South Indian", "North Indian", "Mexican", "Japanese", "Korean", "Thai", "Mediterranean", "Middle Eastern", "French", "American", "Fusion", "Desserts", "Street Food", "Healthy", "Vegan", "Vegetarian"]
unsplash_ids = {
    "Italian": "1498579150354-977475b7ea0b", "Japanese": "1553621042-f16356401f0d", "North Indian": "1585937421612-70a008356fbe", "Mexican": "1565299585323-38d6b0865b47",
    "Korean": "1590301157890-4810ed352733", "Thai": "1562565652-7bc1c3da3c04", "Chinese": "1563245372-f21724e3856d", "Mediterranean": "1540189549336-e6e99c3679fe",
    "American": "1550547660-d9450f859349", "French": "1414235077428-338989a2e8c0", "Desserts": "1488477181946-6428a0291777", "Street Food": "1504674900247-0877df9cc836",
    "Healthy": "1512621776951-a57141f2eefd", "Vegan": "1543362906-acfc16c67564", "Continental": "1414235077428-338989a2e8c0", "Middle Eastern": "1547424850-a4e4ce564e3c",
    "Asian": "1455619452474-d2be8b1e70cd", "Fusion": "1476224203421-9ac39bcb3327", "Vegetarian": "1540914124281-342587941389", "South Indian": "1630383249896-424e482df921"
}
colors = ["#7A1820", "#551118", "#D6A84F", "#D8CABB", "#171515"]
cuisines = []
for i, name in enumerate(cuisine_names):
    photo_id = unsplash_ids.get(name, "1414235077428-338989a2e8c0")
    cuisines.append({
        "id": f"cuisine-{i+1}",
        "name": name,
        "region": "Global",
        "description": f"Authentic and delicious {name} cuisine.",
        "dishCount": random.randint(10, 500),
        "image": f"https://images.unsplash.com/photo-{photo_id}?w=600&h=400&fit=crop&auto=format&q=80",
        "color": random.choice(colors)
    })
write_js("cuisines.js", "cuisines", cuisines)

# -- CREATORS --
creator_names = ["Chef Priya", "Arjun Malhotra", "Sakura Kitchen", "Marco DeLuca", "Zara Patel", "The Spice Lab", "Ananya Iyer", "Min-jun Park", "Ravi's Kitchen", "Sofia Martinez", "Kabir Singh", "Noodle Master", "Preethi Reddy", "Tom Wilson", "Fatima Al-Hassan"]
avatar_ids = ["1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1472099645785-5658abf4ff4e", "1438761681033-6461ffad8d80", "1500648767791-00dcc994a43e"]
creators = []
for i, name in enumerate(creator_names):
    creators.append({
        "id": f"creator-{i+1}",
        "name": name,
        "username": "@" + name.replace(" ", "").replace("'", "").lower(),
        "avatar": f"https://images.unsplash.com/photo-{random.choice(avatar_ids)}?w=200&h=200&fit=crop&auto=format&q=80",
        "coverImage": f"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=300&fit=crop&auto=format&q=80",
        "bio": f"Passionate about {random.choice(cuisine_names)}.",
        "level": random.randint(1, 7),
        "levelName": "Master Chef",
        "chefCoins": random.randint(100, 10000),
        "followers": random.randint(100, 50000),
        "following": random.randint(10, 500),
        "recipesCount": random.randint(5, 100),
        "postsCount": random.randint(10, 200),
        "videosCount": random.randint(0, 50),
        "impressions": random.randint(1000, 100000),
        "rating": round(random.uniform(4.0, 5.0), 1),
        "verified": i < 4,
        "specialties": random.sample(cuisine_names, 2),
        "joinedDate": "2023-01-15T00:00:00Z"
    })
write_js("creators.js", "creators", creators)

# -- RECIPES --
recipe_list = [
    ("Hyderabadi Biryani", "North Indian", "hard", 90, "1563379091339-03b21ab4a4f4"),
    ("Butter Chicken", "North Indian", "medium", 45, "1603894584373-5ac82b2ae328"),
    ("Masala Dosa", "South Indian", "medium", 40, "1630383249896-424e482df921"),
    ("Idli Sambar", "South Indian", "easy", 30, "1589301760435-2d423b8f7a03"),
    ("Creamy Garlic Pasta", "Italian", "easy", 28, "1621996346565-e3dbc646d9a9"),
    ("Margherita Pizza", "Italian", "medium", 35, "1565299624946-b28f40a0ae38"),
    ("Spicy Tonkotsu Ramen", "Japanese", "hard", 120, "1569718212165-3a8278d5f624"),
    ("Salmon Sushi Rolls", "Japanese", "hard", 50, "1579584425555-c3ce17fd4351"),
    ("Korean Fried Chicken", "Korean", "medium", 45, "1575932444877-5106bee2a599"),
    ("Bibimbap", "Korean", "medium", 40, "1590301157890-4810ed352733"),
    ("Street Tacos", "Mexican", "easy", 25, "1565299585323-38d6b0865b47"),
    ("Thai Green Curry", "Thai", "medium", 35, "1455619452474-d2be8b1e70cd"),
    ("Mediterranean Grain Bowl", "Mediterranean", "easy", 20, "1512621776951-a57141f2eefd"),
    ("Classic Mac & Cheese", "American", "easy", 30, "1543339494-b4cd4f7ba686"),
    ("Chocolate Lava Cake", "Desserts", "medium", 25, "1578985545062-69928b1d9587"),
    ("Gulab Jamun", "Desserts", "medium", 45, "1666190100906-2bb8d5cf1e0f"),
    ("Paneer Tikka", "North Indian", "easy", 30, "1567188040759-fb8a883dc6d6"),
    ("Chicken Shawarma", "Middle Eastern", "medium", 40, "1529006557810-274b9b2fc0f1"),
    ("Mushroom Risotto", "Italian", "medium", 45, "1476124369491-e7addf5db371"),
    ("Masala Khichdi", "North Indian", "easy", 25, "1596797038530-2c107229654b")
]
recipes = []
for i, (name, cuisine, diff, time, photo_id) in enumerate(recipe_list):
    creator = random.choice(creators)
    ingredients = [{"name": f"Ingredient {j+1}", "amount": random.randint(1, 5), "unit": "cup", "checked": False} for j in range(random.randint(6, 12))]
    instructions = [{"step": j+1, "title": f"Step {j+1}", "description": f"Do step {j+1} carefully.", "duration": "5 mins"} for j in range(random.randint(4, 8))]
    recipes.append({
        "id": f"recipe-{i+1}", "name": name, "cuisine": cuisine, "cuisineId": f"cuisine-{cuisine_names.index(cuisine)+1}",
        "image": f"https://images.unsplash.com/photo-{photo_id}?w=600&h=400&fit=crop&auto=format&q=80",
        "description": f"A wonderful recipe for {name}.", "prepTime": time//3, "cookTime": time*2//3, "totalTime": time, "servings": random.randint(2, 6),
        "difficulty": diff, "calories": random.randint(200, 800), "protein": random.randint(5, 40), "carbs": random.randint(10, 80), "fat": random.randint(5, 30),
        "fiber": random.randint(1, 10), "sugar": random.randint(1, 20), "rating": round(random.uniform(4.0, 5.0), 1), "saves": random.randint(100, 5000),
        "views": random.randint(1000, 50000), "likes": random.randint(50, 2000), "creatorId": creator["id"], "creatorName": creator["name"], "creatorAvatar": creator["avatar"],
        "hasVideo": random.choice([True, False]), "videoViews": random.randint(1000, 10000) if random.choice([True, False]) else None, "tags": [cuisine, "delicious", diff],
        "ingredients": ingredients, "instructions": instructions
    })
write_js("recipes.js", "recipes", recipes)

# -- COMMUNITIES --
comm_names = ["Midnight Bakers", "South Indian Home Chefs", "Pasta Lovers", "High Protein Kitchen", "Street Food Explorers", "Ramen Society", "Vegan Warriors", "Dessert Lab", "Spice Route", "Sunday Biryani Club"]
communities = []
for i, name in enumerate(comm_names):
    communities.append({
        "id": f"comm-{i+1}", "name": name, "description": f"Community for {name}", "coverImage": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
        "icon": "🍽️", "members": random.randint(100, 5000), "recentActivity": "2 hours ago", "category": "Food", "isPublic": True, "tags": ["food", "cooking"],
        "createdBy": f"creator-{random.randint(1, 15)}", "posts": random.randint(10, 500)
    })
write_js("communities.js", "communities", communities)

# -- MARKETPLACE --
marketplace_items = []
for i in range(15):
    seller = random.choice(creators)
    marketplace_items.append({
        "id": f"item-{i+1}", "name": f"Delicious Food Item {i+1}", "description": "Authentic and fresh.",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
        "price": random.randint(149, 499), "rating": round(random.uniform(4.0, 5.0), 1), "reviews": random.randint(10, 200),
        "sellerId": seller["id"], "sellerName": seller["name"], "sellerAvatar": seller["avatar"], "sellerRating": seller["rating"],
        "cuisine": random.choice(cuisine_names), "isVeg": random.choice([True, False]), "allergens": ["Nuts"], "portionSize": "1 person", "prepTime": "30 mins",
        "availability": random.choice(["Available Now", "Pre-order", "Weekends Only"]), "deliveryType": random.choice(["Pickup", "Delivery", "Both"]), "orders": random.randint(5, 100)
    })
write_js("marketplace.js", "marketplaceItems", marketplace_items)

# -- POSTS --
posts = []
for i in range(20):
    creator = random.choice(creators)
    posts.append({
        "id": f"post-{i+1}", "creatorId": creator["id"], "creatorName": creator["name"], "creatorAvatar": creator["avatar"], "creatorLevel": creator["level"], "creatorBadge": "Pro",
        "type": random.choice(["photo", "recipe", "video", "tip", "experiment", "review"]), "content": "Just made this amazing dish!",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
        "recipeId": f"recipe-{random.randint(1, 20)}" if random.choice([True, False]) else None, "likes": random.randint(10, 1000), "comments": random.randint(1, 100),
        "shares": random.randint(1, 50), "saves": random.randint(1, 50), "views": random.randint(100, 5000), "chefCoinsEarned": random.randint(0, 50),
        "timestamp": datetime.now().isoformat(), "hashtags": ["#food", "#yummy"]
    })
write_js("posts.js", "posts", posts)

# -- COOKTHREADS --
cook_threads = []
for i in range(10):
    creator = random.choice(creators)
    replies = []
    for j in range(random.randint(2, 4)):
        reply_creator = random.choice(creators)
        replies.append({"id": f"reply-{i}-{j}", "creatorName": reply_creator["name"], "creatorAvatar": reply_creator["avatar"], "content": "Looks great!", "image": None, "timestamp": datetime.now().isoformat(), "likes": random.randint(0, 50)})
    cook_threads.append({
        "id": f"thread-{i+1}", "originalCreatorId": creator["id"], "originalCreatorName": creator["name"], "originalCreatorAvatar": creator["avatar"],
        "title": f"How to make {random.choice(cuisine_names)} perfectly", "description": "Let's discuss!", "recipeId": f"recipe-{random.randint(1, 20)}",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
        "videoIndicator": False, "ingredients": ["Salt", "Pepper", "Oil"], "cuisine": random.choice(cuisine_names), "cookTime": "45 mins",
        "replies": replies, "likes": random.randint(10, 500), "comments": len(replies), "shares": random.randint(1, 20), "views": random.randint(100, 2000),
        "timestamp": datetime.now().isoformat()
    })
write_js("cookThreads.js", "cookThreads", cook_threads)

# -- MOODS --
mood_names = ["Happy", "Calm", "Energetic", "Lazy", "Comfort Seeking", "Focused", "Celebrating", "Moody", "Healthy", "Hungry", "Romantic", "Adventurous"]
moods = []
for i, name in enumerate(mood_names):
    recs = [{"dishName": f"Dish for {name}", "recipeId": f"recipe-{random.randint(1, 20)}", "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80", "reason": "Because it matches your mood."} for _ in range(3)]
    moods.append({
        "id": f"mood-{i+1}", "name": name, "emoji": "😊", "color": "bg-red-500", "description": f"Food for when you feel {name}", "recommendations": recs
    })
write_js("moods.js", "moods", moods)

# -- CHALLENGES --
challenges = []
for i in range(10):
    challenges.append({
        "id": f"challenge-{i+1}", "name": f"Challenge {i+1}", "description": "Cook something nice.",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
        "rules": ["Have fun", "Be creative"], "participants": random.randint(10, 500), "startDate": "2024-01-01T00:00:00Z", "endDate": "2024-12-31T00:00:00Z",
        "status": random.choice(["active", "upcoming", "completed"]), "prize": "500 ChefCoins", "entries": random.randint(5, 200), "category": "General", "difficulty": "Medium"
    })
write_js("challenges.js", "challenges", challenges)

# -- NOTIFICATIONS --
notifications = []
for i in range(12):
    notifications.append({
        "id": f"notif-{i+1}", "type": random.choice(["like", "trending", "chefcoin", "reply", "challenge", "community", "review", "follow", "milestone"]),
        "message": "You have a new notification!", "timestamp": datetime.now().isoformat(), "read": random.choice([True, False]), "icon": "🔔"
    })
trendingHashtags = [{"tag": f"#{tag}", "posts": random.randint(100, 10000)} for tag in ["PastaTok", "SundayBiryani", "30MinuteMeals", "StreetFood", "HighProtein", "VeganDelights", "BakingSzn", "SpiceLife", "EasyRecipes", "Foodies"]]
notifications_data = f"export const notifications = {json.dumps(notifications, indent=2)};\nexport const trendingHashtags = {json.dumps(trendingHashtags, indent=2)};\n"
path = os.path.join(base_dir, "notifications.js")
with open(path, 'w', encoding='utf-8') as f:
    f.write(notifications_data)

print("All mock files created successfully!")
