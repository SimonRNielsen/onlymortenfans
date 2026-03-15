/// <summary>
/// Data transfer object with data needed for logging in
/// </summary>
public class LoginDTO
{


    public required string Email { get; set; }


    public required string Password { get; set; }


}

/// <summary>
/// Data transfer object with data pertinent for creating a new user
/// </summary>
public class CreateUserDTO
{


    public required string Name { get; set; }


    public required string Email { get; set; }


    public required string Password { get; set; }

}

/// <summary>
/// Data transfer object that's used for sending data to requestee
/// </summary>
public class PostDTO
{

    public required int PostID { get; set; }

    public required string Poster { get; set; }

    public required string Post { get; set; }

    public List<string>? Comments { get; set; }

    public int? Likes { get; set; }

    public int? Dislikes { get; set; }

}