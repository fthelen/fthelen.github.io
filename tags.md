---
layout: page
title: Tags
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}
<ul>
  {% for tag in sorted_tags %}
  <li id="{{ tag[0] | slugify }}">
    <h2>{{ tag[0] }}</h2>
    <ul>
      {% for post in tag[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a>  {{ post.date | date: site.minima.date_format | default: "%b %-d, %Y" }}</li>
      {% endfor %}
    </ul>
  </li>
  {% endfor %}
</ul>
