---
layout: page
title: Categories
permalink: /categories/
---

{% assign sorted_categories = site.categories | sort %}
<ul>
  {% for category in sorted_categories %}
  <li id="{{ category[0] | slugify }}">
    <h2>{{ category[0] }}</h2>
    <ul>
      {% for post in category[1] %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        {{ post.date | date: site.minima.date_format | default: "%b %-d, %Y" }}
      </li>
      {% endfor %}
    </ul>
  </li>
  {% endfor %}
</ul>
