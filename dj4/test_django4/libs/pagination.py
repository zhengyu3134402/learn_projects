


class Pagination:
    """分页类"""
    def __init__(self, base_url, current_page, data, page_show_data_num, max_page_num):
        self.page_show_data_num = page_show_data_num
        self.max_page_num = max_page_num
        self.half_page = self.max_page_num // 2
        self.total_data_num = len(data)
        self.total_page_num = self.compute_total_page_num(page_show_data_num)
        self.current_page = self.clean_current_page(current_page)
        self.data = data
        self.base_url = base_url


    def clean_current_page(self, current_page):
        """处理当前页问题"""
        try:
            current_page = int(current_page)

            if current_page < self.half_page:

                return current_page
            elif current_page < 1:

                return 1
            elif current_page > self.total_page_num:

                return 1
        except Exception as e:
            # print(e)
            return 1
        return current_page


    def compute_total_page_num(self, page_show_data_num):
        """计算总页数"""
        total_page_num, more = divmod(self.total_data_num, page_show_data_num)
        if more:
            return total_page_num + 1
        return total_page_num


    def make_start_end_page_list(self):
        """创建开始页数，结束页数"""

        if self.total_page_num <= self.max_page_num:

            start_page = 1
            end_page = self.total_page_num

            return range(start_page, end_page+1)

        else:

            if self.current_page <= self.half_page:

                start_page = 1
                end_page = self.max_page_num
                return range(start_page, end_page+1)
            elif (self.current_page + self.half_page) >= self.total_page_num:

                start_page = self.total_page_num - self.max_page_num +1
                end_page = self.total_page_num
                return range(start_page, end_page + 1)
            else:
                start_page = self.current_page - self.half_page
                end_page = self.current_page + self.half_page
                return range(start_page, end_page + 1)


    def make_start_end_data_list(self):
        """创建开始数据索引，结束数据索引"""
        start_data = (self.current_page-1)*self.page_show_data_num

        end_data = self.current_page*self.page_show_data_num
        return self.data[start_data: end_data]


    def make_html(self):

        html_list = []

        html_list.append('<div>')
        first_li = '<a href="{}?current_page={}">首页</a>'.format(self.base_url, 1)
        html_list.append(first_li)

        if self.current_page == 1:
            prev_li = '<a href="#" hiden></a>'
        else:
            prev_li = '<a href="{}?current_page={}" hiden></a>'.format(self.base_url, self.current_page-1)
        html_list.append(prev_li)

        for i in self.make_start_end_page_list():
            li_tag = '<a href="{0}?current_page={1}">{1}</a>'.format(self.base_url, i)
            html_list.append(li_tag)

        if self.current_page == self.total_page_num:
            next_li = '<a href="#" hidden></a>'
        else:
            next_li = '<a href="{}?current_page={}" hidden></a>'.format(self.base_url, self.current_page+1)
        html_list.append(next_li)

        page_end_li = '<a href="{}?current_page={}">尾页</a>'.format(self.base_url, self.total_page_num)

        html_list.append(page_end_li)
        html_list.append('</div>')
        return "".join(html_list)