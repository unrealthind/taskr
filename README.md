# Raavi Interactive Inc. Project & Task Manager

This is a simple, modern project and task management application designed for tracking projects, tasks, and client information. It features a clean user interface and uses Supabase for a seamless backend experience.

***

## Features

* **User Authentication**: Secure login and signup functionality for individual users.
* **Project Management**: Create, view, edit, and filter projects with details such as client name, address, project value, and status (Lead, In Progress, Complete, Lost).
* **Task Management**: Create, view, and edit tasks, assigning them to projects, setting due dates and times, and prioritizing them (High, Medium, Low).
* **Project Notes**: Add and delete notes directly within each project view.
* **Filtering**: Filter projects by status or tasks due, and filter tasks by project, priority, or due date range.
* **Light/Dark Mode**: A toggle to switch between light and dark themes.

***

## Technologies Used

* **Frontend**: HTML, CSS (via Tailwind CSS CDN), JavaScript.
* **Backend**: Supabase (Authentication and Database).

***

## Setup and Installation

Follow these steps to get a local copy of the project running on your machine.

### 1. Supabase Setup

1.  **Create a Supabase Project**: Sign up for a Supabase account and create a new project.
2.  **Create Database Tables**: In the Supabase SQL editor, create the necessary tables. This application uses two tables: `projects` and `tasks`. You'll need to enable Row Level Security (RLS) on these tables and create policies to allow users to `select`, `insert`, `update`, and `delete` only their own data using the `auth.uid()` function.

    **`projects` table schema:**
    * `id` (int8, Primary Key)
    * `user_id` (uuid, Foreign Key to `auth.users` -> `id`)
    * `name` (text)
    * `client_name` (text)
    * `address` (text)
    * `status` (text)
    * `value` (numeric)
    * `client_phone` (text)
    * `client_email` (text)
    * `notes` (jsonb)

    **`tasks` table schema:**
    * `id` (int8, Primary Key)
    * `user_id` (uuid, Foreign Key to `auth.users` -> `id`)
    * `title` (text)
    * `project_id` (int8, Foreign Key to `projects` -> `id`)
    * `due_date` (date)
    * `due_time` (time)
    * `priority` (int2)
    * `completed` (boolean, default: `false`)

### 2. Environment Configuration

1.  **Get Your Supabase Credentials**: Go to your Supabase project's settings, find the API section, and copy your `Project URL` and `anon public` key.
2.  **Create `env.js`**: In the project's root directory, create a new file named `env.js`.
3.  **Add Your Credentials**: Add the following code to `env.js`, replacing the placeholder values with your actual Supabase credentials:

    ```javascript
    window.SUPABASE_CONFIG = {
        supabaseUrl: 'YOUR_SUPABASE_URL',
        supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
    };
    ```

### 3. Running the Application

1.  Clone the repository or download the source files.
2.  After completing the Supabase setup and `env.js` configuration, open the `index.html` file in your web browser. The application will automatically handle routing to the appropriate login or application page.

***

### Setting up Row Level Security (RLS)

Row Level Security (RLS) is a powerful feature in Supabase that ensures users can only access their own data. To enable this, you need to turn on RLS for your tables and create policies that define the access rules.

#### Enabling RLS and Creating Policies

1.  **Enable RLS**: Go to the "Authentication" section in your Supabase dashboard. Navigate to the "Policies" tab, find the `projects` and `tasks` tables, and toggle RLS on for both.

2.  **Create Policies for the `projects` Table**:
    * **Select Policy**: This policy allows a user to read (select) all projects where their user ID matches the `user_id` in the table.
        ```sql
        create policy "Users can view their own projects."
        on projects for select
        to authenticated
        using (
          auth.uid() = user_id
        );
        ```
    * **Insert Policy**: This policy allows an authenticated user to create a new project.
        ```sql
        create policy "Users can create a project."
        on projects for insert
        to authenticated
        with check (
          auth.uid() = user_id
        );
        ```
    * **Update Policy**: This policy allows a user to update a project they own.
        ```sql
        create policy "Users can update their own projects."
        on projects for update
        to authenticated
        using (
          auth.uid() = user_id
        ) with check (
          auth.uid() = user_id
        );
        ```
    * **Delete Policy**: This policy allows a user to delete a project they own.
        ```sql
        create policy "Users can delete their own projects."
        on projects for delete
        to authenticated
        using (
          auth.uid() = user_id
        );
        ```

3.  **Create Policies for the `tasks` Table**:
    * **Select Policy**: This policy allows a user to read (select) all tasks where their user ID matches the `user_id` in the table.
        ```sql
        create policy "Users can view their own tasks."
        on tasks for select
        to authenticated
        using (
          auth.uid() = user_id
        );
        ```
    * **Insert Policy**: This policy allows an authenticated user to create a new task.
        ```sql
        create policy "Users can create a task."
        on tasks for insert
        to authenticated
        with check (
          auth.uid() = user_id
        );
        ```
    * **Update Policy**: This policy allows a user to update a task they own.
        ```sql
        create policy "Users can update their own tasks."
        on tasks for update
        to authenticated
        using (
          auth.uid() = user_id
        ) with check (
          auth.uid() = user_id
        );
        ```
    * **Delete Policy**: This policy allows a user to delete a task they own.
        ```sql
        create policy "Users can delete their own tasks."
        on tasks for delete
        to authenticated
        using (
          auth.uid() = user_id
        );
        ```


## Contributing

This project is licensed under the GNU Public License. We welcome contributions from the community. If you would like to contribute, please fork the repository, make your changes, and submit a pull request. We appreciate your help in making this a better tool.
