module Jekyll
  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tag', tag)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['title'] = tag
    end
  end

  class CategoryPage < Page
    def initialize(site, base, category)
      @site = site
      @base = base
      @dir  = File.join('category', category)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['title'] = category
    end
  end

  class GenerateTagsAndCategories < Generator
    safe true

    def generate(site)
      tags = site.posts.docs.flat_map { |p| p.data['tags'] || [] }.uniq
      categories = site.posts.docs.flat_map { |p| p.data['categories'] || [] }.uniq

      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end

      categories.each do |category|
        site.pages << CategoryPage.new(site, site.source, category)
      end
    end
  end
end