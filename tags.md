---
layout: base
title: Tags
permalink: /tags/
---
<ul>
  {% assign all_tags = site.tags | sort %}
  {% for tag in all_tags %}
    <li>{{ tag[0] }}</li>
  {% endfor %}
</ul>