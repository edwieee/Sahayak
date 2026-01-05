# Sahayak Admin Panel

A Python-based administrative panel for managing service updates and sending SMS notifications to Sahayak users.

## Features

### 🎛️ Core Capabilities

1. **Service Update Management**
   - Create and track service updates
   - Mark updates as critical for priority notifications
   - Track affected user count
   - View update history

2. **SMS Notification System**
   - Send SMS to subscribed users
   - Support for both mock SMS (testing) and real SMS (Twilio)
   - Track delivery status
   - View notification logs

3. **User Subscription Management**
   - Track user subscriptions to services
   - Manage active/inactive subscriptions
   - Add test users for demonstrations

4. **Activity Logging**
   - View recent service updates
   - Monitor SMS delivery status
   - Track notification success rates

## Installation

### Prerequisites
- Python 3.7 or higher
- SQLite3 (included with Python)

### Setup

1. **Install dependencies** (optional, only if using real SMS):
```bash
pip install twilio
```

2. **Configure Twilio** (optional, for real SMS):
   - Sign up at https://www.twilio.com
   - Get your Account SID, Auth Token, and Phone Number
   - Set environment variables:
```bash
export TWILIO_ACCOUNT_SID="your_account_sid"
export TWILIO_AUTH_TOKEN="your_auth_token"
export TWILIO_PHONE_NUMBER="+1234567890"
```

3. **Enable real SMS** (optional):
   - Open `admin_panel.py`
   - Change `USE_REAL_SMS = False` to `USE_REAL_SMS = True`

## Usage

### Quick Start - Run Demo

```bash
python admin_panel.py
```

This will run a complete demonstration showing:
- Creating test user subscriptions
- Creating service updates
- Triggering SMS notifications
- Viewing activity logs

### Using the Admin Panel Programmatically

```python
from admin_panel import SahayakAdminPanel

# Initialize admin panel
admin = SahayakAdminPanel()

# 1. Add user subscription
admin.add_test_subscription(
    user_id="user_123",
    phone_number="+919876543210",
    service_id="ayushman-bharat"
)

# 2. Create service update
update_id = admin.create_service_update(
    service_id="ayushman-bharat",
    service_name="Ayushman Bharat Health Scheme",
    update_type="timing_change",
    update_message="New hours: 9 AM - 6 PM, including Sundays",
    is_critical=True
)

# 3. Send notifications to all subscribed users
summary = admin.trigger_update_notifications(update_id)

# 4. View logs
admin.view_recent_updates(10)
admin.view_sms_log(20)
```

### Update Types

- `timing_change` - Office hours or schedule changes
- `document_change` - Document requirement updates
- `eligibility_change` - Eligibility criteria modifications
- `deadline_change` - Application deadline updates
- `location_change` - Office location changes
- `process_change` - Application process updates

## Database Schema

### Tables

**service_updates**
- Stores all service update records
- Tracks critical status and affected users

**sms_notifications**
- Logs all SMS sent
- Tracks delivery status and errors

**user_subscriptions**
- Manages user subscriptions to services
- Supports active/inactive status

## Mock SMS vs Real SMS

### Mock SMS (Default)
- No external dependencies
- Logs messages to console
- Perfect for testing and demonstrations
- No cost

### Real SMS (Twilio)
- Requires Twilio account
- Sends actual SMS messages
- Costs apply per message
- Production-ready

## Example Scenarios

### Scenario 1: Critical Office Hours Change

```python
admin = SahayakAdminPanel()

# Create critical update
update_id = admin.create_service_update(
    service_id="healthcare-center-123",
    service_name="City Health Center",
    update_type="timing_change",
    update_message="URGENT: Office closed tomorrow (15th Jan) due to public holiday. Emergency services available at District Hospital.",
    is_critical=True
)

# Notify all subscribed users
admin.trigger_update_notifications(update_id)
```

### Scenario 2: Document Requirement Update

```python
update_id = admin.create_service_update(
    service_id="pm-kisan",
    service_name="PM-KISAN Scheme",
    update_type="document_change",
    update_message="NEW REQUIREMENT: Aadhaar linking mandatory from 1st Feb. Bring Aadhaar card to nearest center.",
    is_critical=False
)

admin.trigger_update_notifications(update_id)
```

## Monitoring and Logs

### View Recent Updates
```python
admin.view_recent_updates(limit=10)
```

### View SMS Log
```python
admin.view_sms_log(limit=20)
```

## Integration with Sahayak App

The admin panel works seamlessly with the Sahayak web app:

1. **User Subscriptions**: When users mark interest in a service in the app, they're automatically subscribed
2. **Notifications**: Updates created here trigger notifications in the app
3. **Database**: Shares the same SQLite database (`server/sahayak.db`)

## Security Considerations

⚠️ **Important for Production:**

1. **Protect Twilio Credentials**: Never commit credentials to version control
2. **Use Environment Variables**: Store sensitive data in environment variables
3. **Access Control**: Implement authentication for admin panel access
4. **Rate Limiting**: Implement SMS rate limiting to prevent abuse
5. **Audit Logging**: Track who creates updates and sends notifications

## Future Enhancements

- [ ] Web-based admin interface (Flask/FastAPI)
- [ ] Email notifications alongside SMS
- [ ] WhatsApp Business API integration
- [ ] Scheduled notifications
- [ ] User segmentation and targeting
- [ ] Analytics dashboard
- [ ] Bulk import/export functionality

## Troubleshooting

### Database not found
- Ensure `server/sahayak.db` exists
- Run the Sahayak app first to create the database

### SMS not sending
- Check Twilio credentials
- Verify phone number format (+country code)
- Check Twilio account balance

### Import errors
- Install required packages: `pip install twilio`
- Ensure Python 3.7+ is installed

## License

Part of the Sahayak project - A Digital Help Desk for Government Services

## Support

For issues or questions, please refer to the main Sahayak project documentation.
