json.content  @message.content
json.name @message.user.name
json.data  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image  @message.image.url