# Use the official nginx image as the base
FROM nginx:alpine

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Remove the default index.html file
RUN rm /usr/share/nginx/html/index.html

# Copy the HTML files from the current directory to the working directory
COPY . /usr/share/nginx/html/

# Update the file permissions
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Check if the HTML files were copied correctly
RUN ls -l /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

# Define the default command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]