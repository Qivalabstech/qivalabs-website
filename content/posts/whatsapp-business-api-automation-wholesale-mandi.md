---
title: WhatsApp Business API automation for wholesale and mandi businesses: a practical guide
seo_title: WhatsApp Business API Automation for Mandi and Wholesale Businesses | QivaLabs
slug: whatsapp-business-api-automation-wholesale-mandi
description: How wholesale and mandi businesses in India can automate orders, supplier updates, payment reminders and owner reports with the WhatsApp Business API, including 2026 per-message costs.
excerpt: Most mandi businesses already run on WhatsApp. Here is what the WhatsApp Business API can automate, what it costs per message in 2026, and what should stay human.
category: Automation
date: 2026-06-20
updated: 2026-11-23
keywords: WhatsApp Business API, WhatsApp automation, WhatsApp automation for business India, mandi software, wholesale order management WhatsApp
cover_text: WHATSAPP AUTOMATION
service: /services/business-automation
service_name: WhatsApp automation
---

Walk into almost any wholesale mandi business in India and you'll find the same setup: one phone with hundreds of WhatsApp chats, a notebook or Excel sheet for orders, and staff who spend most of the day reading and replying to messages. It works until order volume or the number of suppliers crosses a certain point. Then orders get missed, prices go out wrong and nobody can say who promised what.

We built QIVA Bot, our WhatsApp automation system for mandi businesses, after months of talking to vegetable mandis, grain dealers and FMCG wholesalers in Udaipur and the rest of Rajasthan. This is what we learned.

## What a mandi business really does on WhatsApp

A typical wholesaler runs three sets of conversations at the same time. Retailers ask for prices, place orders and want confirmations. Suppliers share stock availability and confirm purchases. Inside the business, delivery staff, accounts and the owner all need updates.

Usually all of it happens in the owner's personal number or a single WhatsApp Business account. There's no separation, no record anyone can search, and no way to check what happened when there's a dispute.

## What the WhatsApp Business API can and can't do

The WhatsApp Business API, which Meta now calls the WhatsApp Business Platform, is different from the free WhatsApp Business app on your phone.

- It lets software send and receive messages, so a system can take an order at 5 AM without a person holding the phone.
- Messages that you start, like order confirmations or payment reminders, use templates that Meta approves in advance. Order and payment templates are usually approved quickly. Promotional templates are reviewed more strictly.
- It needs its own phone number. You can't use a number that's already active on regular WhatsApp.
- Replies to customers who message you first are charged differently from messages you start.

## What it costs in 2026

Since July 2025, Meta charges per delivered template message instead of per conversation, and the price depends on the message category and the recipient's country. For Indian numbers, the rate card from October 2026 is about ₹0.115 for a utility message, such as an order update, and about ₹0.86 for a marketing message, before GST. On top of Meta's charges you pay a platform fee to the provider (BSP) you connect through.

In practice, a mandi sending mostly order confirmations and reminders pays very little per message. Marketing broadcasts to your whole retailer list are where the bill grows, so we keep those to a minimum and sort every template into the correct category. Rates change, so always check Meta's current rate card before you budget.

## What's worth automating

### Taking orders

Retailers ask for today's rates and the bot replies with a price list you update from a simple admin screen. The retailer replies with quantities in plain language, for example "5 bori aloo, 10 kg bhindi kal subah". The bot reads it, confirms the total and records the order, and the dispatch team is notified. In our experience this one change saves a few hours of messaging every day.

### Payment reminders

The system sends polite reminders at set intervals after delivery. Owners tell us this is the automation they value most, because money comes in on time without awkward phone calls.

### Supplier updates

A daily message asks suppliers for availability, collects the replies and sends purchasing a summary. This replaces a morning of individual calls.

### Owner reports

At the end of the day the owner gets a WhatsApp summary of orders, total value, collections, pending dues and new customers, even while travelling.

## What should stay human

Relationships run a mandi. A long-time retailer with a complaint, a supplier offering a special deal or a new buyer who needs convincing all need a real person. Automation should handle the volume so your people have time for those conversations.

Automation also needs clean data. If your product list, prices and customer records are messy, the bot will be too. We usually spend the first week of a project sorting that out.

## How we set it up

QIVA Bot uses the WhatsApp Business API through an approved provider, connected to a backend that holds your customers, products, prices and orders. It runs three bots: one for customers, one for suppliers and one for the owner's reports. They understand normal Hindi and English messages instead of forcing people through number menus.

Setup takes about two to three weeks, including API approval, loading your data and training staff. After that you pay the message charges and a monthly fee.

You can see how it works on the [QIVA Bot case study](/portfolio/qiva-bot-mandi-whatsapp-automation). If you run a mandi or wholesale business and want to see what your day would look like with this in place, [talk to us](/contact). We also build [business automation](/services/business-automation) and [AI chatbots](/services/ai-integrated-automation) for other industries.
